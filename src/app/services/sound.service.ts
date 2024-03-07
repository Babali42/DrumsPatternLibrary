import {Injectable} from '@angular/core';
import {Sample} from '../models/sample';
import {Track} from '../models/track';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  bpm: number = 120;
  isPlaying: boolean = false;
  index: number = 0;
  private samples: Sample[] = [];
  private context: AudioContext;
  private tracks: Track[] = [];
  private playbackSource: AudioBufferSourceNode;
  private stepNumber: number = 16;

  constructor() {
    this.context = new AudioContext();
    this.playbackSource = new AudioBufferSourceNode(this.context);
  }

  async playPause(): Promise<void> {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      const loopBuffer = await this.getRenderedBuffer();
      this.playSound(loopBuffer);
    } else {
      this.pause();
    }
  }

  pause() {
    this.playbackSource.stop(this.context.currentTime);
    this.reset();
  }

  private playSound(loopBuffer: AudioBuffer) {
    const source = this.context.createBufferSource();
    source.buffer = loopBuffer;
    source.connect(this.context.destination);
    source.loop = true;
    source.loopStart = source.buffer.duration / 2;
    source.loopEnd = source.buffer.duration;
    const startTime = this.context.currentTime;
    source.start();

    const updateDisplay = () => {
      const currentTime = this.context.currentTime - startTime;
      this.index = Math.trunc(((currentTime * 1000) / this.getMillisStepFromBpm()) % this.stepNumber);
      if (this.isPlaying)
        requestAnimationFrame(updateDisplay);
    };

    updateDisplay();

    if (this.playbackSource.buffer) {
      this.playbackSource.stop(this.context.currentTime);
    }
    this.playbackSource = source;
  }

  private getMillisStepFromBpm(): number {
    const beat = 60000 / this.bpm;
    let quaterBeat = beat / 4;
    quaterBeat = Math.min(quaterBeat, 1000);
    quaterBeat = Math.max(quaterBeat, 10);
    return quaterBeat;
  }

  //Rendered sound (twice the grid length)  ████░░░░
  //Played sound (the doted part is looped) ████░░░░░░░░░░░░░░░░░░░░░░░░
  //Used to avoid sound clip ;)
  async getRenderedBuffer() {
    const tickLength = this.getTickLength();
    const offlineContext: OfflineAudioContext = new OfflineAudioContext(1, this.stepNumber * 2 * tickLength * 44100, 44100);
    this.tracks.forEach((track: Track) => {
      const trackSteps = this.getDuplicatedTrackSteps(track);
      trackSteps.forEach((beat: boolean, i: number) => {
        if (!beat)
          return;

        const audioBuffer = this.samples.find(x => x.fileName === track.fileName)!.sample!;
        const audioBufferSourceNode = offlineContext.createBufferSource();
        audioBufferSourceNode.buffer = audioBuffer;
        audioBufferSourceNode.connect(offlineContext.destination);

        const when = i * tickLength;
        audioBufferSourceNode.start(when);
      });
    });

    offlineContext.oncomplete = (event: OfflineAudioCompletionEvent) => {
      return event.renderedBuffer;
    }
    return await offlineContext.startRendering();
  }


  private getDuplicatedTrackSteps(track: Track) {
    const duplicatedTracks = [...track.steps]
    duplicatedTracks.push(...track.steps);
    return duplicatedTracks;
  }

  reset(): void {
    this.isPlaying = false;
    this.index = 0;
  }

  setBpm(bpm: number): void {
    this.bpm = bpm;
  }

  setTracks(tracks: Track[]) {
    this.tracks = tracks;
    const trackNames = tracks.map(x => x.fileName);
    this.loadTracks(trackNames);
  }

  private loadTracks(trackNames: string[]) {
    trackNames.forEach(x => this.samples.push(new Sample(x)))
    for (const sample of this.samples) {
      this.getAudioBuffer(sample.fileName).then(arrayBuffer => sample.sample = arrayBuffer)
        .then(() => {
        })
        .catch(() => {
        });
    }
  }

  private async getAudioBuffer(soundName: string): Promise<AudioBuffer> {
    const myRequest = new Request(`assets/sounds/${soundName}`);
    const response = await fetch(myRequest);
    const arrayBuffer = await response.arrayBuffer();
    return await this.context.decodeAudioData(arrayBuffer).then((data) => {
      return data
    });
  }

  private getTickLength() {
    return 60 / this.bpm / 4;
  };

  setStepNumber(length: number) {
    this.stepNumber = length;
  }
}

import {Injectable} from '@angular/core';
import {Sample} from '../models/sample';
import {Track} from '../models/track';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  bpm: number = 120;
  isPlaying: boolean = false;

  private samples: Sample[] = [];
  private context: AudioContext;
  private tracks: Track[] = [];
  private ms: number = this.getMillisStepFromBpm();
  private cursor = 0;
  private playbackSource: AudioBufferSourceNode | null  = null;

  constructor() {
    this.context = new AudioContext();
    this.cursor = 0;
  }

  async playPause() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      var loopBuffer = await this.getRenderedBuffer();
      this.playSound(loopBuffer);
    }else {
      // @ts-ignore
      this.playbackSource.stop(this.context.currentTime);
    }
  }

  private playSound(loopBuffer: AudioBuffer) {
    var source = this.context.createBufferSource();
    source.buffer = loopBuffer;
    source.connect(this.context.destination);
    source.loop = true;
    source.start(this.context.currentTime, this.cursor * this.getTickLength());
    if (this.playbackSource) {
      this.playbackSource.stop(this.context.currentTime);
    }
    this.playbackSource = source;
  }

  private getMillisStepFromBpm(): number {
    let beat = 60000 / this.bpm;
    let quaterBeat = beat / 4;
    quaterBeat = Math.min(quaterBeat, 1000);
    quaterBeat = Math.max(quaterBeat, 10);
    return quaterBeat;
  }

  async getRenderedBuffer() {
    var tickLength = this.getTickLength();
    var offlineContext = new OfflineAudioContext(1, 16 * tickLength * 44100, 44100);

    this.tracks.forEach((track: Track) => {
      track.steps.forEach((beat: boolean, i: number) => {
        if (beat) {
          let audioBuffer = this.samples.find(x => x.fileName === track.fileName)!.sample!;
          let audioBufferSourceNode = offlineContext.createBufferSource();
          audioBufferSourceNode.buffer = audioBuffer;
          audioBufferSourceNode.connect(offlineContext.destination);

          var when = i * tickLength;
          audioBufferSourceNode.start(when);
        }
      });
    });

    offlineContext.oncomplete = (event: OfflineAudioCompletionEvent) => {
      return event.renderedBuffer;
    }
    return await offlineContext.startRendering();
  }


  reset(): void {
    this.isPlaying = false;
  }

  setBpm(bpm: number): void {
    this.bpm = bpm;
    this.ms = this.getMillisStepFromBpm();
  }

  setTracks(tracks: Track[]) {
    this.tracks = tracks;
    let trackNames = tracks.map(x => x.fileName);
    this.loadTracks(trackNames);
  }

  private loadTracks(trackNames: string[]) {
    trackNames.forEach(x => this.samples.push(new Sample(x)))
    this.samples.forEach((sample) => {
      this.getAudioBuffer(sample.fileName).then(arrayBuffer => {
        sample.sample = arrayBuffer;
      });
    });
  }

  private async getAudioBuffer(soundName: String): Promise<AudioBuffer> {
    let myRequest = new Request(`assets/sounds/${soundName}`);
    const response = await fetch(myRequest);
    const arrayBuffer = await response.arrayBuffer();
    return await this.context.decodeAudioData(arrayBuffer).then((data) => {
      return data
    });
  }

  private getTickLength() {
    return 60 / this.bpm / 4;
  };
}

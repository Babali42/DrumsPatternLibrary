import {Injectable} from '@angular/core';
import {Sample} from '../models/sample';
import {Track} from '../models/track';
import {AudioFilesService} from "./audio-files.service";
import {SoundGeneratorService} from "./sound-generator.service";
import {Sound} from "./sound";

@Injectable({
  providedIn: 'root'
})
export class SoundWebApi implements Sound {
  bpm: number = 120;
  isPlaying: boolean = false;
  index: number = 0;
  private samples: Sample[] = [];
  private context: AudioContext;
  private tracks: Track[] = [];
  private playbackSource: AudioBufferSourceNode;
  private stepNumber: number = 16;

  constructor(private audioFilesService: AudioFilesService, private soundGeneratorService: SoundGeneratorService) {
    this.context = new AudioContext();
    this.playbackSource = new AudioBufferSourceNode(this.context);
  }

  async playPause(): Promise<void> {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      const loopBuffer = await this.soundGeneratorService.getRenderedBuffer(this.tracks, this.samples, this.bpm, this.stepNumber);
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
    let quarterBeat = beat / 4;
    quarterBeat = Math.min(quarterBeat, 1000);
    quarterBeat = Math.max(quarterBeat, 10);
    return quarterBeat;
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
      this.audioFilesService.getAudioBuffer(sample.fileName).then(arrayBuffer => sample.sample = arrayBuffer)
        .then(() => {
        })
        .catch(() => {
        });
    }
  }

  setStepNumber(length: number) {
    this.stepNumber = length;
  }
}

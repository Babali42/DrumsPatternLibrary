import {Injectable} from '@angular/core';
import {Sample} from '../models/sample';
import {Track} from '../models/track';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  index: number;
  bpm: number = 120;
  isPlaying: boolean = false;

  private samples: Sample[] = [];
  private audioCtx: AudioContext;
  private tracks: Track[] = [];
  private ms: number = this.getMillisStepFromBpm();

  constructor() {
    this.audioCtx = new AudioContext();
    this.index = 0;
    this.scheduler();
  }

  playPause() {
    this.isPlaying = !this.isPlaying;
  }

  scheduler() {
    if (this.isPlaying) {
      this.playSamples(this.index);
      this.index < 15 ? this.index++ : this.index = 0;
    }

    setTimeout(() => {
      this.scheduler();
    }, this.ms);
  }

  private getMillisStepFromBpm(): number {
    let beat = 60000 / this.bpm;
    let quaterBeat = beat / 4;
    quaterBeat = Math.min(quaterBeat, 1000);
    quaterBeat = Math.max(quaterBeat, 10);
    return quaterBeat;
  }

  playSamples(index: number) {
    this.tracks.forEach(track => {
      if (track.steps[index]) {
        this.playSound(this.samples.find(x => x.fileName === track.fileName)!.sample!);
      }
    });
  }

  playSound(buffer: AudioBuffer): void {
    let source = this.audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioCtx.destination);
    source.start(0);
  }


  reset(): void {
    this.isPlaying = false;
    this.index = 0;
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
    return await this.audioCtx.decodeAudioData(arrayBuffer).then((data) => {
      return data
    });
  }
}

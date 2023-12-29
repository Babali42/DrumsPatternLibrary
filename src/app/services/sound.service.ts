import { Injectable } from '@angular/core';
import {Sample} from "../models/sample";
import {Track} from "../models/track";

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  index: number = 0;
  bpm: number = 120;
  ms: number = this.getMillisStepFromBpm();
  isPlaying: boolean = false;
  private samples: Sample[] = [];
  private audioCtx: AudioContext;

  constructor() {
    this.audioCtx = new AudioContext();
    this.scheduler();
  }

  playPause() {
    this.isPlaying = !this.isPlaying;
  }

  setBpm(bpm: number) : void {
    this.bpm = bpm;
    this.ms = this.getMillisStepFromBpm();
  }

  scheduler() {
    if(this.isPlaying){
      this.index < 15 ? this.index++ : this.index = 0;
      this.playSamples(this.index);
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

  private loadTracks(trackNames: string[]) {
    trackNames.forEach(x => this.samples.push(new Sample(x)))
    this.samples.forEach((sample) => {
      this.getAudioBuffer(sample.FileName).then(arrayBuffer => {
        sample.Sample = arrayBuffer;
        console.log(sample.Sample);
      });
    });
  }

  async getAudioBuffer(soundName: String): Promise<AudioBuffer> {
    let myRequest = new Request(`assets/sounds/${soundName}`);
    const response = await fetch(myRequest);
    const arrayBuffer = await response.arrayBuffer();
    return await this.audioCtx.decodeAudioData(arrayBuffer).then((data) => { return data });
  }

  playSamples(index : number) {
    // this.beats.forEach(beat => {
    //   if (beat.Beats[i]) {
    //     //@ts-ignore
    //     this.playSound(this.samples.find(x => x.FileName === beat.FileName).Sample);
    //   }
    // });
  }

  setTracks(tracks: Track[]) {
    let trackNames = tracks.map(x => x.fileName);
    this.loadTracks(trackNames);
  }
}

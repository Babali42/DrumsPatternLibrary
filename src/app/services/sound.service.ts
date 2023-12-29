import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  index: number = 0;
  bpm: number = 120;
  ms: number = this.getMillisStepFromBpm();
  isPlaying: boolean = false;

  constructor() {
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
}

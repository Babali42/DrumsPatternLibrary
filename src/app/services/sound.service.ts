import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  isPlaying: boolean = false;

  constructor() { }

  playPause() {
    this.isPlaying = !this.isPlaying;
  }
}

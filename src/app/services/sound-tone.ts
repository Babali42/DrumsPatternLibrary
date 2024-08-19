import {Injectable} from "@angular/core";
import {Track} from "../models/track";
import {Sound} from "./sound";
import * as Tone from 'tone';

@Injectable({
  providedIn: 'root'
})
export class SoundTone implements Sound {
  bpm: number = 120;
  isPlaying: boolean = false;
  index: number = 0;
  private kick: Tone.Player;
  private snare: Tone.Player;
  private hihat: Tone.Player;
  private crash: Tone.Player;
  private seq: Tone.Sequence<string | null>;
  private stepNumber: number = 16;
  private _tracks: Track[] = [];

  constructor() {

    // Initialize the players with audio files
    this.kick = new Tone.Player('assets\\sounds\\techno\\kick.wav').toDestination();
    this.snare = new Tone.Player('assets\\sounds\\techno\\snare.wav').toDestination();
    this.hihat = new Tone.Player('assets\\sounds\\techno\\hat.wav').toDestination();
    this.crash = new Tone.Player('assets\\sounds\\metal\\crash.wav').toDestination();

    // Initialize the sequence
    this.seq = new Tone.Sequence(
      (time, note) => {
        if (note === 'kick') {
          this.kick.start(time);
        } else if (note === 'snare') {
          this.snare.start(time);
        } else if (note === 'hihat') {
          this.hihat.start(time);
        } else if (note === 'crash') {
          this.crash.start(time);
        }
      },
      ['kick', 'hihat', 'snare', 'hihat', 'snare', 'hihat', 'snare', 'hihat', 'kick', 'hihat', 'snare', 'hihat', 'kick', null, 'snare', 'snare' ],
      '16n'
    );
  }

  pause(): void {
  }

  playPause(): Promise<void> {
    this.seq.start(0);
    Tone.Transport.start();
    return Promise.resolve(undefined);
  }

  reset(): void {
  }

  setBpm(bpm: number): void {
    Tone.Transport.bpm.value = bpm;
  }

  setStepNumber(length: number): void {
    this.stepNumber = length;
  }

  setTracks(tracks: Track[]): void {
    this._tracks = tracks;
  }
}

import {Injectable} from "@angular/core";
import {Track} from "../models/track";
import {Sound} from "./sound";
import * as Tone from 'tone';
import {Sequence} from "tone";

@Injectable({
  providedIn: 'root'
})
export class SoundTone implements Sound {
  bpm: number = 120;
  isPlaying: boolean = false;
  index: number = 0;
  private sequence: Sequence<any> = new Sequence();
  private stepNumber: number = 16;

  pause(): void {
  }

  playPause(): Promise<void> {
    this.sequence.start(0);
    Tone.Transport.start();
    return Promise.resolve(undefined);
  }

  reset(): void {
    this.sequence = new Sequence();
  }

  setBpm(bpm: number): void {
    Tone.Transport.bpm.value = bpm;
  }

  setStepNumber(length: number): void {
    this.stepNumber = length;
  }

  setTracks(tracks: Track[]): void {
    Tone.start().then(() => {
      const players = {};

      const buffers = {}; // Object to hold the preloaded buffers
      // @ts-ignore
      const loadPromises = []; // Array to hold loading promises

      tracks.forEach(track => {
        const buffer = new Tone.Buffer("assets\\sounds\\" + track.fileName);
        // @ts-ignore
        buffers[track.name] = buffer;
        loadPromises.push(buffer.loaded);
      });

      // @ts-ignore
      Promise.all(loadPromises).then(() => {
        // Create a single sequence to orchestrate all tracks
        const stepsPerTrack = tracks.map(track => track.steps);
        const totalSteps = tracks[0].steps.length;

        this.sequence = new Tone.Sequence((time, stepIndex) => {
          tracks.forEach((track, trackIndex) => {
            const shouldPlay = stepsPerTrack[trackIndex][stepIndex];

            if (shouldPlay) {
              // Create a new player instance using the preloaded buffer
              const newPlayer = new Tone.Player("assets\\sounds\\" + track.fileName, () => {
                newPlayer.start(time);
                newPlayer.onstop = () => newPlayer.dispose();
              }).toDestination();
            }
          });
        }, Array.from({length: totalSteps}, (_, i) => i), "16n");
      });
    });
  }
}

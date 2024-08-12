import {Track} from "../models/track";

export interface Sound {
  bpm: number;
  isPlaying: boolean;
  index: number;

  playPause(): Promise<void>;
  pause(): void;
  reset(): void;
  setBpm(bpm: number): void;
  setTracks(tracks: Track[]): void;
  setStepNumber(length: number): void;
}

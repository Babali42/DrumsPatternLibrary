import { Track } from "./track";

export interface Beat {
  name: string;
  bpm: number;
  tracks: Track[];
}

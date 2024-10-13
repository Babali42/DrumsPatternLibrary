import { Track } from "./track";

export interface Beat {
  id: string;
  bpm: number;
  tracks: Track[];
}

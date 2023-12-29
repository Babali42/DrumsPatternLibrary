import {Track} from "./track";

export class Beat{
  constructor(name: string, bpm: number, tracks: Track[]) {
    this.name = name;
    this.bpm = bpm;
    this.tracks = tracks;
  }

  name: string;
  bpm: number;
  tracks: Track[];
}

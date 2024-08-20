import {JsonTrack} from "./json-track";

export interface JsonBeat {
  name: string;
  bpm: number;
  tracks: JsonTrack[];
}

import {JsonBeat} from "./json-beat";
import {Beat} from "../domain/beat";
import {JsonTrack} from "./json-track";
import {Track} from "../domain/track";

export class Convert {
  public static toBeat(jsonBeat: JsonBeat): Beat {
    const tracks = jsonBeat.tracks.map(x => Convert.toTrack(x));
    return {name: jsonBeat.name, bpm: jsonBeat.bpm, tracks: tracks};
  }

  private static toTrack(jsonTrack: JsonTrack): Track {
    if (jsonTrack.steps.length != 16 && jsonTrack.steps.length != 32 && jsonTrack.steps.length != 64) {
      throw new Error(`Error during casting json track steps, please count steps of ${jsonTrack.name} track`);
    }

    return {
      name: jsonTrack.name,
      fileName: jsonTrack.fileName,
      steps: Array.from(jsonTrack.steps).map(x => x == "X")
    };
  }
}

import {JsonTrack} from "./jsonTrack";
import {Beat} from "../beat";
import {Track} from "../track";

export interface JsonBeat {
  name: string;
  bpm: number;
  tracks: JsonTrack[];
}

export const StepLengths = {
  sixteen: 16,
  thirty_two: 32,
  sixty_four: 64
}

export class Convert {
  public static toBeat(jsonBeat: JsonBeat): Beat {
    const tracks = jsonBeat.tracks.map(x => Convert.toTrack(x));
    return new Beat(jsonBeat.name, jsonBeat.bpm, tracks);
  }

  private static toTrack(jsonTrack: JsonTrack): Track {
    if (jsonTrack.steps.length != StepLengths.sixteen && jsonTrack.steps.length != StepLengths.thirty_two && jsonTrack.steps.length != StepLengths.sixty_four)
      throw new Error(`Error during casting json track steps, please count steps of ${jsonTrack.name} track`);
    return new Track(jsonTrack.name, jsonTrack.fileName, Array.from(jsonTrack.steps).map(x => x == "X"));
  }
}

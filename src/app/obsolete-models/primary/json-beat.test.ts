import {describe, expect} from '@jest/globals';
import {Convert} from "./convert";

describe('Primary beat', () => {
  it.each([
    ["XXXXXXXXXXXXXXXX", 16],
    ["XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", 32],
    ["XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", 64]
  ])('with step %p should be a %p length grid', (steps : string, result: number) => {
    const beat = Convert.toBeat({name: "", bpm: 128, tracks: [{name: "", fileName: "", steps: steps}]});
    expect(beat.tracks[0].steps.length).toEqual(result);
  });
});

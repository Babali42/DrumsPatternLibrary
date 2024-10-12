import {Convert} from "./convert";

describe('HeroAdapterService', () => {
  it('with step 16 should be a 16 length grid', () => {
    const beat = Convert.toBeat({name: "", bpm: 128, tracks: [{name: "", fileName: "", steps: "XXXXXXXXXXXXXXXX"}]});
    expect(beat.tracks[0].steps.length).toEqual(16);
  });

  it('with step 32 should be a 32 length grid', () => {
    const beat = Convert.toBeat({name: "", bpm: 128, tracks: [{name: "", fileName: "", steps: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"}]});
    expect(beat.tracks[0].steps.length).toEqual(32);
  });

  it('with step 64 should be a 64 length grid', () => {
    const beat = Convert.toBeat({name: "", bpm: 128, tracks: [{name: "", fileName: "", steps: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"}]});
    expect(beat.tracks[0].steps.length).toEqual(64);
  });
});

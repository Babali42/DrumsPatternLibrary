import { Component, OnInit } from '@angular/core';
import {Beat, BooleanArray} from "../../models/beat";

@Component({
  selector: 'sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.css']
})
export class SequencerComponent implements OnInit {
  public beats: Array<Beat> = [];
  public numbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  public static isMouseDown = false;
  public static beatFileNameMouseDowned: string = "";
  public static newValue = true;

  ngOnInit(): void {
    var fourOnTheFloor = [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false ] as BooleanArray;
    this.beats = [
      new Beat("", fourOnTheFloor,"Kick"),
      new Beat("", fourOnTheFloor,"Snare"),
      new Beat("", fourOnTheFloor,"Open Hat"),
      new Beat("", fourOnTheFloor,"Closed Hat"),
    ];
  }

  play(){

  }

  beatChanged() {

  }

  mouseDownOnSequencer(fileName: string, number: number) {
    if(SequencerComponent.isMouseDown)
      return;

    SequencerComponent.isMouseDown = true;
    SequencerComponent.beatFileNameMouseDowned = fileName;

    let beat = this.beats.find(x => x.FileName === fileName);
    if(beat)
      SequencerComponent.newValue = !beat.Beats[number];
    this.changeBeat(fileName, number);
  }

  mouseUpOnSequencer() {
    SequencerComponent.isMouseDown = false;
  }

  mouseEnterOnButton(fileName: string, number: number) {
    if(!SequencerComponent.isMouseDown)
      return;
    if(SequencerComponent.beatFileNameMouseDowned !== fileName)
      return;
    this.changeBeat(fileName, number);
  }

  changeBeat(fileName: string, number: number){
    let beat = this.beats.find(x => x.FileName === fileName);
    //@ts-ignore
    beat.Beats[number] = SequencerComponent.newValue;
    this.beatChanged();
  }

  getSoundIsPlaying(): boolean{
    return false;
  }

  isCellEnabled(number: number): boolean{
    return false;
  }

  isBeatMuted(fileName: string): boolean {
    let beat = this.beats.find(x => x.FileName === fileName);
    if(beat)
      return beat.IsMuted;
    return false;
  }

  toggleMute(fileName: string) {
    let beat = this.beats.find(x => x.FileName === fileName);
    if(beat)
      beat.IsMuted = !beat.IsMuted;
    this.beatChanged();
  }
}

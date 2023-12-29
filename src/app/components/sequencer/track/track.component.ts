import {Component, Input, OnInit} from '@angular/core';
import {Track} from "../../../models/track";

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  @Input() track: Track = new Track("","",[]);
  @Input('current-step-index') currentStepIndex: number = 0;

  steps: boolean[] = [];
  name: string = "";

  constructor() {
  }

  ngOnInit(): void {
    this.name = this.track.name;
    this.steps = this.track.steps;
  }
}

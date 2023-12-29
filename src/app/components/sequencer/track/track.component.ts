import {Component, Input, OnInit} from '@angular/core';
import {track} from "../../../models/track";

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  @Input() track: track = {name: "", steps: []};
  @Input('current-step-index') currentStepIndex: number = 0;

  steps: boolean[] = [];
  name: string = "";

  constructor() {
  }

  ngOnInit(): void {
    this.name = this.track.name;
    this.steps = this.track.steps
      .map(x => x.trim())
      .map(x => Boolean(x));
  }
}

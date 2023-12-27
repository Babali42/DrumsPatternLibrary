import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {track} from "./../../models/track";

@Component({
  selector: 'sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.css']
})
export class SequencerComponent implements OnInit {
  steps: boolean[] = [];
  name: string = "";

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((result : track) => {
      this.name = result.name;
      this.steps = result.steps
        .map(x => x.trim())
        .map(x => Boolean(x));
    });
  }
}


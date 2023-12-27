import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Beat} from "../../models/beat";

@Component({
  selector: 'sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.css']
})
export class SequencerComponent implements OnInit {

  @Input() fileName: string = "";
  beat: Beat = {name: "", tracks: []};

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getData(this.fileName).subscribe((result: Beat) => {
      this.beat = result;
    });
  }
}


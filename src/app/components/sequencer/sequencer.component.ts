import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.css']
})
export class SequencerComponent implements OnInit {

  steps: boolean[] = [];

  ngOnInit(): void {
    let myJSON = '["X", " ", " ", " ","X", " ", " ", " ", "X", " ", " ", " ", "X", " ", " ", " "]';
    let myArray : string[] = JSON.parse(myJSON);
    this.steps = myArray
      .map(x => x.trim())
      .map(x => Boolean(x));
  }
}

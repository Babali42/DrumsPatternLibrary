import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Beat} from "../../models/beat";
import {SoundService} from "../../services/sound.service";

@Component({
  selector: 'sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.scss']
})
export class SequencerComponent implements OnInit {

  @Input() fileName: string = "";
  beat: Beat = new Beat();

  constructor(private dataService: DataService, public soundService: SoundService) {
  }

  ngOnInit(): void {
    this.dataService.getData(this.fileName).subscribe((result: Beat) => {
      this.beat = result;
      this.soundService.setBpm(this.beat.bpm);
    });
  }

  toggleIsPlaying(): void{
    this.soundService.playPause();
  }
}


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

  constructor(private dataService: DataService, private soundService: SoundService) {
  }

  ngOnInit(): void {
    this.dataService.getData(this.fileName).subscribe((result: Beat) => {
      this.beat = result;
    });
  }

  getIsPlaying(): boolean{
    return this.soundService.isPlaying;
  }

  toggleIsPlaying(): void{
    this.soundService.playPause();
  }
}


import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Convert, JsonBeat} from "../../models/primary/jsonBeat";
import {SoundService} from "../../services/sound.service";
import {Beat} from "../../models/beat";

@Component({
  selector: 'sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.scss']
})
export class SequencerComponent implements OnInit {

  @Input() fileName: string = "";
  beat: Beat = new Beat("", 120, []);

  constructor(private dataService: DataService, public soundService: SoundService) {
  }

  ngOnInit(): void {
    this.dataService.getData(this.fileName).subscribe((result: JsonBeat) => {
      this.beat = Convert.toBeat(result);
      if(this.soundService.isPlaying)
        this.soundService.pause();
      this.soundService.reset();
      this.soundService.setBpm(this.beat.bpm);
      this.soundService.setTracks(this.beat.tracks);
    });
  }

  toggleIsPlaying(): void {
    this.soundService.playPause().then(
      () => {},
      () => {}
    );
  }
}


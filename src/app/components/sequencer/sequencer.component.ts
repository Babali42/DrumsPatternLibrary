import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Convert, JsonBeat} from '../../models/primary/jsonBeat';
import {SoundService} from '../../services/sound.service';
import {Beat} from '../../models/beat';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.scss']
})
export class SequencerComponent implements OnInit {

  @Input() fileNameBehaviourSubject: BehaviorSubject<string>
  beat: Beat = new Beat('', 120, []);

  constructor(private dataService: DataService, public soundService: SoundService) {
    this.fileNameBehaviourSubject = new BehaviorSubject<string>("metal");
  }

  ngOnInit(): void {
    this.fileNameBehaviourSubject.subscribe(fileName => {
      this.dataService.getData<JsonBeat>(fileName, 'beats/').subscribe((result: JsonBeat) => {
        this.beat = Convert.toBeat(result);
        if (this.soundService.isPlaying)
          this.soundService.pause();
        this.soundService.reset();
        this.soundService.setBpm(this.beat.bpm);
        this.soundService.setTracks(this.beat.tracks);
        this.soundService.setStepNumber(this.beat.tracks[0].steps.length);
      });
    });
  }

  toggleIsPlaying(): void {
    this.soundService.playPause().then(
      () => {
      },
      () => {
      }
    );
  }
}


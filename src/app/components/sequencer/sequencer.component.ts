import {Component, Input} from '@angular/core';
import {SoundService} from '../../services/sound.service';
import {Beat} from '../../models/beat';

@Component({
  selector: 'sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.scss']
})
export class SequencerComponent {
  @Input() beat: Beat = new Beat('', 120, []);

  constructor(public soundService: SoundService) {
  }

  calculateClass() {
    switch (this.beat.tracks.length) {
      case 16:
        return "sixteen-steps";
      case 32:
        return "thirty-two-steps";
      case 64:
        return "sixty-four-steps";
    }
    return "";
  }
}


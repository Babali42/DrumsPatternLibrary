import {Component, Input} from '@angular/core';
import {SoundService} from '../../services/sound.service';
import {Beat} from '../../models/beat';
import { NgFor } from '@angular/common';

@Component({
    selector: 'sequencer',
    templateUrl: './sequencer.component.html',
    styleUrls: ['./sequencer.component.scss'],
    standalone: true,
    imports: [NgFor]
})
export class SequencerComponent {
  @Input() beat: Beat = new Beat('', 120, []);

  constructor(public soundService: SoundService) {
  }
}


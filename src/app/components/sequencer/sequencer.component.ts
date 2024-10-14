import {Component, Input} from '@angular/core';
import {SoundService} from '../../services/sound/sound.service';
import {Beat} from '../../domain/beat';
import { NgFor } from '@angular/common';
import { StepLengths } from './models/step-lengths';

@Component({
    selector: 'sequencer',
    templateUrl: './sequencer.component.html',
    styleUrls: ['./sequencer.component.scss'],
    standalone: true,
    imports: [NgFor]
})
export class SequencerComponent {
  @Input() beat: Beat = {id: '', bpm: 120, tracks: []};

  constructor(public soundService: SoundService) {
  }

  protected readonly StepLengths = StepLengths;
  protected readonly Math = Math;
}


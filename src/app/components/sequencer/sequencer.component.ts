import {Component, Input} from '@angular/core';
import {SoundWebApi} from '../../services/sound-web-api';
import {Beat} from '../../models/beat';
import { NgFor } from '@angular/common';
import { StepLengths } from 'src/app/models/step-lengths';

@Component({
    selector: 'sequencer',
    templateUrl: './sequencer.component.html',
    styleUrls: ['./sequencer.component.scss'],
    standalone: true,
    imports: [NgFor]
})
export class SequencerComponent {
  @Input() beat: Beat = new Beat('', 120, []);

  constructor(public sound: SoundWebApi) {
  }

  protected readonly StepLengths = StepLengths;
}


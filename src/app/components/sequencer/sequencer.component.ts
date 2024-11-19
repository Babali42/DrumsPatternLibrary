import {Component, Input} from '@angular/core';
import {SoundService} from '../../services/sound/sound.service';
import {Beat} from '../../domain/beat';
import { NgFor } from '@angular/common';
import { StepLengths } from './models/step-lengths';
import {Genre} from "../../domain/genre";

@Component({
    selector: 'sequencer',
    templateUrl: './sequencer.component.html',
    styleUrls: ['./sequencer.component.scss'],
    standalone: true,
    imports: [NgFor]
})
export class SequencerComponent {
  @Input() beat = {} as Beat;
  @Input() genre = {} as Genre;

  constructor(public soundService: SoundService) {
  }

  toggleIsPlaying(): void {
    this.soundService.playPause().then(
      () => {
      },
      () => {
      }
    );
  }

  protected readonly StepLengths = StepLengths;
  protected readonly Math = Math;
}


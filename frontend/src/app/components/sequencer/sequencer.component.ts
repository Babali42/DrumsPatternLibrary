import {Component, HostListener, Inject, Input, OnInit} from '@angular/core';
import {SoundService} from '../../services/sound/sound.service';
import {Beat} from '../../domain/beat';
import {NgFor} from '@angular/common';
import {StepLengths} from './models/step-lengths';
import {Genre} from "../../domain/genre";
import { ActivatedRoute } from '@angular/router';
import IManageGenres, {IManageGenresToken} from "../../domain/ports/secondary/i-manage-genres";
import {Subject} from "rxjs";

@Component({
  selector: 'sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.scss'],
  standalone: true,
  imports: [NgFor]
})
export class SequencerComponent implements OnInit {
  beat = {} as Beat;
  genre = {} as Genre;
  beatBehaviourSubject: Subject<Beat>;

  constructor(@Inject(IManageGenresToken)  private _genresManager: IManageGenres,
              public soundService: SoundService,
              private route: ActivatedRoute) {
    this.beatBehaviourSubject = new Subject<Beat>();
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const selectedBeat = params.get('beat') || 'defaultBeat';
      const selectedGenre = params.get('genre') || 'defaultGenre';
      this.beatBehaviourSubject.next({id: selectedBeat} as Beat);
    });

    this._genresManager.getGenres().then(genres => {
      this.selectGenre(genres[0]);
    }).catch(error => { console.log(error); });

    this.beatBehaviourSubject.subscribe(beat => {
      if (this.soundService.isPlaying)
        this.soundService.pause();
      this.soundService.reset();
      this.soundService.setBpm(beat.bpm);
      this.soundService.setTracks(beat.tracks);
      this.soundService.setStepNumber(beat.tracks[0].steps.length);
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

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.code == "Space") {
      this.toggleIsPlaying();
    }
  }

  selectGenre(genre: Genre): void {
    this.genre = genre;
    this.selectBeat(this.genre.beats[0]);
  }

  selectBeat(beat: Beat): void {
    this.beat = beat;
    this.beatBehaviourSubject.next(this.beat)
  }

  protected readonly StepLengths = StepLengths;
  protected readonly Math = Math;
}


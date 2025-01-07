import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {SoundService} from '../../services/sound/sound.service';
import {Beat} from '../../domain/beat';
import {NgFor} from '@angular/common';
import {StepLengths} from './models/step-lengths';
import {Genre} from "../../domain/genre";
import {ActivatedRoute} from '@angular/router';
import IManageGenres, {IManageGenresToken} from "../../domain/ports/secondary/i-manage-genres";
import {Subject} from "rxjs";
import {BpmInputComponent} from "../bpm-input/bpm-input.component";
import {SelectInputComponent} from "../select-input/select-input.component";

@Component({
  selector: 'sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.scss'],
  standalone: true,
  imports: [NgFor, BpmInputComponent, SelectInputComponent]
})
export class SequencerComponent implements OnInit {
  beat = {} as Beat;
  genre = {} as  Genre;
  beatBehaviourSubject: Subject<Beat>;
  genres: string[] = [];
  selectedGenreLabel: string = "";

  constructor(@Inject(IManageGenresToken)  private _genresManager: IManageGenres,
              public soundService: SoundService,
              private route: ActivatedRoute) {
    this.beatBehaviourSubject = new Subject<Beat>();
  }

  ngOnInit() {
    this._genresManager.getGenres().then(genres => {
      this.genres = genres.map(x => x.label);
      this.route.queryParamMap.subscribe((params) => {
        this.selectGenre(genres, params.get('genre'), params.get('beat'));
      });
    }).catch(error => { console.log(error); });

    this.beatBehaviourSubject.subscribe(beat => {
      if (this.soundService.isPlaying)
        this.soundService.pause();
      this.soundService.reset();
      this.soundService.resetLoopBuffer();
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

  selectGenre(genres : Genre[], genre: string | null, beat: string | null): void {
    const firstGenre = genre ? genres.find(x => x.label === genre) : genres[0];
    if (!firstGenre) return;

    this.genre = firstGenre;

    const beatToSelect = beat ? firstGenre.beats.find(x => x.id === beat) : firstGenre.beats[0];
    this.selectBeat(beatToSelect);
  }

  selectBeat(beatToSelect: Beat | undefined): void {
    if (beatToSelect == undefined) return;
    this.beat = beatToSelect;
    this.beatBehaviourSubject.next(this.beat)
  }

  protected readonly StepLengths = StepLengths;
  protected readonly Math = Math;

  changeBeatBpm($event: number) {
    const isPlaying = this.soundService.isPlaying;
    this.soundService.setBpm($event);
    this.soundService.generateLoopBuffer().then(
      () => {
        if(isPlaying)
          this.soundService.play();
      },
      () => {
      }
    );
  }
}


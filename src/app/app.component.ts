import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, Subject} from 'rxjs';
import {Beat} from "./domain/beat";
import {SoundService} from "./services/sound/sound.service";
import {ModeToggleService} from "./services/light-dark-mode/mode-toggle.service";
import {Genre} from "./domain/genre";
import IManageGenres from "./domain/ports/secondary/i-manage-genres";
import { Mode } from './services/light-dark-mode/mode-toggle.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isMobileDisplay: boolean = true;
  selectedGenre: Genre = {label : "metal", beats: []};
  selectedBeat: Beat = {id: "metal", label: "Metal", bpm: 128, tracks: []};
  musicGenres: Genre[] = [];
  beatBehaviourSubject: Subject<Beat>;
  isPortrait: boolean = false;
  isLandscape: boolean = false;
  mode: Mode = Mode.LIGHT;

  constructor(private responsive: BreakpointObserver,
              @Inject('IManageGenres') private _genresManager: IManageGenres,
              public soundService: SoundService,
              private modeToggleService: ModeToggleService) {
    this.beatBehaviourSubject = new Subject<Beat>();
    this.modeToggleService.modeChanged$.subscribe(x => this.mode = x);
    this.checkOrientation();
  }

  ngOnInit(): void {
    this.responsive.observe([
      Breakpoints.Web,
    ]).subscribe(result => {
      this.isMobileDisplay = !result.matches;
    });

    this._genresManager.getGenres().pipe(map(genres => {
      this.musicGenres = genres;
      this.selectedGenre = this.musicGenres[0];
      this.selectedBeat = this.selectedGenre.beats[0];
      this.beatBehaviourSubject.next(this.selectedBeat)
    })).subscribe();

    this.beatBehaviourSubject.subscribe(beat => {
      if (this.soundService.isPlaying)
        this.soundService.pause();
        this.soundService.reset();
        this.soundService.setBpm(beat.bpm);
        this.soundService.setTracks(beat.tracks);
        this.soundService.setStepNumber(beat.tracks[0].steps.length);
    });
  }

  selectGenre(genre: Genre) {
    this.selectedGenre = genre;
    this.selectedBeat = this.selectedGenre.beats[0];
    this.updateBeat();
  }

  selectBeat(beat: Beat) {
    this.selectedBeat = beat;
    this.updateBeat();
  }

  updateBeat() {
    this.beatBehaviourSubject.next(this.selectedBeat);
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
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code == "Space") {
      this.soundService.playPause().then(
        () => {
        },
        () => {
        }
      );
    }
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event: Event) {
    this.checkOrientation();
  }

  checkOrientation() {
    const orientation = window.screen.orientation.angle;
    this.isPortrait = orientation === 0 || orientation === 180;
    this.isLandscape = orientation === 90 || orientation === -90;
  }

  protected readonly Mode = Mode;
}

import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {BehaviorSubject, map} from 'rxjs';
import {Beat} from "./domain/beat";
import {SoundService} from "./services/sound/sound.service";
import {ModeToggleService} from "./services/light-dark-mode/mode-toggle.service";
import {Genre} from "./domain/genre";
import IManageGenres from "./domain/ports/secondary/i-manage-genres";
import {IManageBeats} from "./domain/ports/secondary/i-manage-beats";
import { Mode } from './services/light-dark-mode/mode-toggle.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isMobileDisplay: boolean = true;
  selectedGenreIndex: number = 0;
  selectedBeatIndex: number = 0;
  musicGenres: Genre[] = [];
  beatIdBehaviourSubject: BehaviorSubject<string>;
  beat: Beat = {id: '', label: '', bpm: 120, tracks: []};
  isPortrait: boolean = false;
  isLandscape: boolean = false;
  mode: Mode = Mode.LIGHT;

  constructor(private responsive: BreakpointObserver,
              @Inject('IManageGenres') private _genresManager: IManageGenres,
              @Inject('IManageBeats') private _beatsManager: IManageBeats,
              public soundService: SoundService,
              private modeToggleService: ModeToggleService) {
    this.beatIdBehaviourSubject = new BehaviorSubject<string>('metal');
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
      this.musicGenres = genres
    })).subscribe();

    this.beatIdBehaviourSubject.subscribe(beatId => {
      this._beatsManager.getBeat(beatId).subscribe((result: Beat) => {
        this.beat = result;
        if (this.soundService.isPlaying)
          this.soundService.pause();
        this.soundService.reset();
        this.soundService.setBpm(this.beat.bpm);
        this.soundService.setTracks(this.beat.tracks);
        this.soundService.setStepNumber(this.beat.tracks[0].steps.length);
      });
    });
  }

  selectGenre(i: number) {
    this.selectedGenreIndex = i;
    this.selectedBeatIndex = 0;
    this.updateBeat();
  }

  selectBeat(i: number) {
    this.selectedBeatIndex = i;
    this.updateBeat();
  }

  updateBeat() {
    const beatId = this.musicGenres[this.selectedGenreIndex].beats[this.selectedBeatIndex].id;
    this.beatIdBehaviourSubject.next(beatId);
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

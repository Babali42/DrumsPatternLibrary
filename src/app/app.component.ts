import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {BehaviorSubject, map} from 'rxjs';
import {Beat} from "./domain/beat";
import {SoundService} from "./services/sound/sound.service";
import {ModeToggleService} from "./services/light-dark-mode/mode-toggle.service";
import {Genre} from "./domain/genre";
import IManageGenres from "./domain/ports/secondary/i-manage-genres";
import {IManageBeats} from "./domain/ports/secondary/i-manage-beats";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isMobileDisplay: boolean = true;
  selectedGenreIndex: number = 0;
  selectedSubGenreIndex: number = 0;
  musicGenres: Genre[] = [];
  fileNameBehaviourSubject: BehaviorSubject<string>;
  beat: Beat = {id: '', bpm: 120, tracks: []};

  constructor(private responsive: BreakpointObserver,
              @Inject('IManageGenres') private _genresManager: IManageGenres,
              @Inject('IManageBeats') private _beatsManager: IManageBeats,
              public soundService: SoundService,
              private modeToggleService: ModeToggleService) {
    this.fileNameBehaviourSubject = new BehaviorSubject<string>('metal');
    this.modeToggleService.modeChanged$.subscribe();
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

    this.fileNameBehaviourSubject.subscribe(fileName => {
      this._beatsManager.getBeat(fileName).subscribe((result: Beat) => {
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
    this.selectedSubGenreIndex = 0;
    this.updateFileName();
  }

  selectSubGenre(i: number) {
    this.selectedSubGenreIndex = i;
    this.updateFileName();
  }

  updateFileName() {
    const fileName = this.musicGenres[this.selectedGenreIndex].subGenres[this.selectedSubGenreIndex].fileName;
    this.fileNameBehaviourSubject.next(fileName);
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
}

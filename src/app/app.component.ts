import {Component, HostListener, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Genre} from './models/genre';
import {BehaviorSubject} from 'rxjs';
import {Beat} from "./models/beat";
import {SoundService} from "./services/sound.service";
import {Convert, JsonBeat} from "./models/primary/jsonBeat";
import {JsonFilesService} from "./services/json-files.service";
import {Mode} from "./models/mode-toggle.model";
import {ModeToggleService} from "./services/mode-toggle.service";

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
  beat: Beat = new Beat('', 120, []);
  private currentMode: Mode = Mode.DARK;

  constructor(private responsive: BreakpointObserver, private jsonFilesService: JsonFilesService, public soundService: SoundService, private modeToggleService: ModeToggleService) {
    this.fileNameBehaviourSubject = new BehaviorSubject<string>('metal');
    this.modeToggleService.modeChanged$.subscribe((mode: Mode) => {
      this.currentMode = mode;
    });
  }

  ngOnInit(): void {
    this.responsive.observe([
      Breakpoints.Web,
    ]).subscribe(result => {
      this.isMobileDisplay = !result.matches;
    });

    this.jsonFilesService.get<Genre[]>('genres').subscribe((result: Genre[]) => {
      this.musicGenres = result;
    });

    this.fileNameBehaviourSubject.subscribe(fileName => {
      this.jsonFilesService.get<JsonBeat>(fileName, 'beats/').subscribe((result: JsonBeat) => {
        this.beat = Convert.toBeat(result);
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
    console.log(this.musicGenres);
    console.log(this.selectedGenreIndex);
    console.log(this.selectedSubGenreIndex);
    const nextFileName = this.musicGenres[this.selectedGenreIndex].subGenres[this.selectedSubGenreIndex].fileName;
    console.log(nextFileName);
    this.fileNameBehaviourSubject.next(nextFileName);
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

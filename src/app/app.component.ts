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
import {JsonBeat} from "./models/primary/json-beat";
import {Convert} from "./models/primary/convert";

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

  constructor(private responsive: BreakpointObserver, private jsonFilesService: JsonFilesService, public sound: SoundWebApi, private modeToggleService: ModeToggleService) {
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
        if (this.sound.isPlaying)
          this.sound.pause();
        this.sound.reset();
        this.sound.setBpm(this.beat.bpm);
        this.sound.setTracks(this.beat.tracks);
        this.sound.setStepNumber(this.beat.tracks[0].steps.length);
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
    this.sound.playPause().then(
      () => {
      },
      () => {
      }
    );
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code == "Space") {
      this.sound.playPause().then(
        () => {
        },
        () => {
        }
      );
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Genre} from './models/genre';
import {BehaviorSubject} from 'rxjs';
import {Beat} from "./models/beat";
import {SoundService} from "./services/sound.service";
import {Convert, JsonBeat} from "./models/primary/jsonBeat";
import {JsonFilesService} from "./services/json-files.service";

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

  constructor(private responsive: BreakpointObserver, private jsonFilesService: JsonFilesService, public soundService: SoundService) {
    this.fileNameBehaviourSubject = new BehaviorSubject<string>('metal');
  }

  ngOnInit(): void {
    this.responsive.observe([
      Breakpoints.Web,
    ])
      .subscribe(result => {
        this.isMobileDisplay = !result.matches;
      });

    this.jsonFilesService.getData<Genre[]>('genres').subscribe((result: Genre[]) => {
      this.musicGenres = result;
    });

    this.fileNameBehaviourSubject.subscribe(fileName => {
      this.jsonFilesService.getData<JsonBeat>(fileName, 'beats/').subscribe((result: JsonBeat) => {
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
}

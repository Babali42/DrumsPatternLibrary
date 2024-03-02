import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subgenre} from './models/subgenre';
import {Genre} from './models/genre';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isMobileDisplay: boolean = true;
  selectedGenreIndex: number = 0;
  selectedSubGenreIndex: number = 0;
  musicGenres: Genre[] = [
    new Genre('Metal',
      [
        new Subgenre('Metal', 'metal'),
        new Subgenre('Rock', 'rock-beat'),
        new Subgenre('Rock variation', 'rock-beat-variation'),
        new Subgenre('Half time groove', 'half-time-groove'),
      ]),
    new Genre('Techno', [
      new Subgenre('Basique', 'techno'),
    ]),
    new Genre('Garage', [
      new Subgenre('Drum & Bass', 'drum-n-bass'),
      new Subgenre('Garage - 2 step', 'garage'),
    ]),
    new Genre('Trance', [
      new Subgenre('Psytrance', 'psytrance'),
    ])
  ];
  fileNameBehaviourSubject: BehaviorSubject<string>;

  constructor(private responsive: BreakpointObserver, private router: Router) {
    this.fileNameBehaviourSubject = new BehaviorSubject<string>('metal');
  }

  ngOnInit(): void {
    this.responsive.observe([
      Breakpoints.Web,
    ])
      .subscribe(result => {
        this.isMobileDisplay = !result.matches;
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

  private updateFileName() {
    const fileName = this.musicGenres[this.selectedGenreIndex].subGenres[this.selectedSubGenreIndex].fileName;
    console.log(fileName);
    this.fileNameBehaviourSubject.next(fileName);
  }
}

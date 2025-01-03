import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Beat} from "./domain/beat";
import {ModeToggleService} from "./services/light-dark-mode/mode-toggle.service";
import {Genre} from "./domain/genre";
import IManageGenres, {IManageGenresToken} from "./domain/ports/secondary/i-manage-genres";
import {Mode} from './services/light-dark-mode/mode-toggle.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isMobileDisplay: boolean = true;
  selectedGenre = {} as Genre;
  selectedBeat = {} as Beat;
  musicGenres: Genre[] = [];

  isPortrait: boolean = false;
  isLandscape: boolean = false;
  mode: Mode = Mode.LIGHT;

  protected readonly Mode = Mode;

  constructor(private responsive: BreakpointObserver,
              @Inject(IManageGenresToken) private _genresManager: IManageGenres,
              private modeToggleService: ModeToggleService,
              private router: Router) {
    this.modeToggleService.modeChanged$.subscribe(x => this.mode = x);
    this.checkOrientation();
  }

  ngOnInit(): void {
    this.responsive.observe([
      Breakpoints.Web,
    ]).subscribe(result => {
      this.isMobileDisplay = !result.matches;
    });

    this._genresManager.getGenres().then(genres => {
      this.musicGenres = genres;
      this.selectGenre(this.musicGenres[0]);
    }).catch(error => { console.log(error); });
  }

  selectGenre(genre: Genre): void {
    this.selectedGenre = genre;
    this.selectBeat(this.selectedGenre.beats[0]);
  }

  selectBeat(beat: Beat): void {
    this.selectedBeat = beat;
    this.navigateToBeat(beat)
      .then(success => console.log('Navigation success:', success))
      .catch(err => console.error('Navigation error:', err));
  }

  navigateToBeat(beat: Beat) {
    return this.router.navigate([""], {
      queryParams: {genre: this.selectedGenre.label, beat: beat.id},
      queryParamsHandling: 'merge', // Merge with existing query params (optional)
      replaceUrl: true,
    });
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event: Event): void {
    this.checkOrientation();
  }

  checkOrientation(): void {
    const orientation = window.screen.orientation.angle;
    this.isPortrait = orientation === 0 || orientation === 180;
    this.isLandscape = orientation === 90 || orientation === -90;
  }
}

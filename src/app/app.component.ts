import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Link} from "./models/link";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isMobileDisplay: boolean = true;
  links: Link[] = [
    new Link("Techno", "/techno"),
    new Link("Drum & Bass", "/drum-n-bass"),
    new Link("Garage - 2 step", "/garage"),
    new Link("Psytrance", "/psytrance"),
    new Link("Metal", "/metal"),
    new Link("Rock", "/rock"),
    new Link("Rock variation", "/rock-variation"),
    new Link("Half time groove", "/half-time-groove")
  ]

  constructor(private responsive: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.responsive.observe([
      Breakpoints.Web,
    ])
      .subscribe(result => {
        this.isMobileDisplay = !result.matches;
      });
  }
}

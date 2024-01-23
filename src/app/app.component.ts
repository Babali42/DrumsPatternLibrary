import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isMobileDisplay: boolean = true;
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

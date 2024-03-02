import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {SequencerComponent} from './components/sequencer/sequencer.component';
import {HttpClientModule} from '@angular/common/http';
import {TrackComponent} from './components/sequencer/track/track.component';

@NgModule({
  declarations: [
    AppComponent,
    SequencerComponent,
    TrackComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

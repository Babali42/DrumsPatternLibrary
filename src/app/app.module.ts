import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideRouter} from '@angular/router';
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
    AppRoutingModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

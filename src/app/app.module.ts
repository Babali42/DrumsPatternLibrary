import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TechnoComponent} from './pages/techno/techno.component';
import {MetalComponent} from './pages/metal/metal.component';
import {provideRouter} from '@angular/router';
import {routes} from '../app.route';
import {SequencerComponent} from "./components/sequencer/sequencer.component";
import {HttpClientModule} from "@angular/common/http";
import { TrackComponent } from './components/sequencer/track/track.component';
import { RockComponent } from './pages/rock/rock.component';
import { RockVariationComponent } from './pages/rock-variation/rock-variation.component';
import { HalfTimeGrooveComponent } from './pages/half-time-groove/half-time-groove.component';
import { DrumNBassComponent } from './pages/drum-n-bass/drum-n-bass/drum-n-bass.component';
import { GarageComponent } from './pages/garage/garage/garage.component';
import { PsytranceComponent } from './pages/psytrance/psytrance/psytrance.component';

@NgModule({
  declarations: [
    AppComponent,
    TechnoComponent,
    MetalComponent,
    SequencerComponent,
    TrackComponent,
    RockComponent,
    RockVariationComponent,
    HalfTimeGrooveComponent,
    DrumNBassComponent,
    GarageComponent,
    PsytranceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent]
})
export class AppModule {
}

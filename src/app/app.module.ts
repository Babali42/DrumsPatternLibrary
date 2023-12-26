import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TechnoComponent } from './pages/techno/techno.component';
import { MetalComponent } from './pages/metal/metal.component';
import { provideRouter } from '@angular/router';
import { routes } from '../app.route';
import { EbmComponent } from './pages/ebm/ebm.component';
import {SequencerComponent} from "./components/sequencer/sequencer.component";
import { GabberComponent } from './pages/gabber/gabber.component';

@NgModule({
    declarations: [
        AppComponent,
        TechnoComponent,
        MetalComponent,
        EbmComponent,
        SequencerComponent,
        GabberComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent]
})
export class AppModule { }

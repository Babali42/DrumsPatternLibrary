import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from "./adapters/secondary/in-memory-data.service";
import {SequencerComponent} from "./components/sequencer/sequencer.component";
import {GenresAdapterService} from "./adapters/secondary/genres-adapter.service";
import {LoadingBarModule} from '@ngx-loading-bar/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoadingInterceptor} from './interceptors/loading.interceptor';
import {environment} from "../environments/environment";
import {provideRouter, RouterOutlet, Routes} from "@angular/router";

export const routes: Routes = [
  { path: '', component: SequencerComponent },
  { path: 'add-beat', component: SequencerComponent }
];
import {IManageGenresToken} from "./domain/ports/secondary/i-manage-genres";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    LoadingBarModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    environment.httpClientInMemory ? HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ) : [],
    SequencerComponent,
    RouterOutlet
  ],
  declarations: [AppComponent],
  providers: [
    // Inject adapters into domain classes
    {provide: IManageGenresToken, useClass: GenresAdapterService},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    provideRouter(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}


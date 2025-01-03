import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {IManageGenresToken} from "./domain/ports/secondary/i-manage-genres";
import {GenresAdapterService} from "./adapters/secondary/genres-adapter.service";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "./app.module";
import {ActivatedRoute} from "@angular/router";
import {Beat} from "./domain/beat";
import {Genre} from "./domain/genre";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent], // Declare the component
      imports: [BrowserModule, HttpClientModule, LoadingBarModule, RouterTestingModule.withRoutes(routes)],
      providers: [{ provide: IManageGenresToken, useClass: GenresAdapterService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('on base url should navigate when genre is selected', () => {
    component.selectedGenre = {label: "techno"} as Genre;
    component.navigateToBeat({ id: "gabber"} as Beat)
      .then(() => {
        activatedRoute.url.subscribe(value => {
          expect(value[0].path).toEqual("");
        })
        activatedRoute.queryParams.subscribe(value => {
          console.log(value);
          expect(value).toEqual({genre: "techno", beat: "gabber"})
        })})
      .catch(err => console.error(err));
  });
});

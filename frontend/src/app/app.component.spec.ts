import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {IManageGenresToken} from "./domain/ports/secondary/i-manage-genres";
import {GenresAdapterService} from "./adapters/secondary/genres-adapter.service";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "./app.module";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Beat} from "./domain/beat";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let location: Location;
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

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate when genre is selected', () => {
    component.selectBeat({ id: "metal"} as Beat);
    activatedRoute.queryParams.subscribe(x => expect(x).toBeDefined());
  });
});

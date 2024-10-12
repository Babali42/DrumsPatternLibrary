import {JsonFilesService} from "../services/json-files.service";
import {TestBed} from "@angular/core/testing";
import {HttpClient} from "@angular/common/http";

describe('HeroAdapterService', () => {
  let service: JsonFilesService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['get', 'post', 'put', 'delete']);
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientSpy }]
    });
    service = TestBed.inject(JsonFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

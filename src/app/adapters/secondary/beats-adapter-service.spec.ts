import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import {BeatsAdapterService} from "./beats-adapter-service";
import {Beat} from "../../domain/beat";

describe('BeatsAdapterService', () => {
  let service: BeatsAdapterService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientSpy }]
    });
    service = TestBed.inject(BeatsAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected beat', (done: DoneFn) => {
    const expectedBeat: Beat =
      { id: "dancehall-reggaeton", bpm: 180, tracks: [] };


    httpClientSpy.get.and.returnValue(of(expectedBeat));

    service.getBeat("dancehall-reggaeton").subscribe({
      next: beat => {
        expect(beat).toEqual(expectedBeat);
        done();
      },
      error: err => fail(`Expected beat, but got an error: ${err}`)
    });

    expect(httpClientSpy.get).toHaveBeenCalledOnceWith('api/beats/dancehall-reggaeton');
  });

  it('should return an error getting beat when the server returns a 404', (done: DoneFn) => {

    const errorResponse = {
      body: { error: 'test 404 error'},
      status: 404, statusText: 'Not Found'
    };

    httpClientSpy.get.and.returnValue(throwError(() => errorResponse));

    service.getBeat("blablah").subscribe({
      next: _ => done.fail('expected an error, not genres'),
      error: error  => {
        expect(error.name).toEqual('Error');
        expect(error.message).toContain('test 404 error');
        done();
      }
    });
  });
});

import { SoundService } from "./sound.service";
import {SoundGeneratorService} from "./sound-generator.service";
import { TestBed } from "@angular/core/testing";
import {LoadingBarService} from "@ngx-loading-bar/core";

describe("sound", () => {
  let soundService: SoundService;
  let soundGeneratorService: SoundGeneratorService;

  beforeEach(() => {
    const mockSoundGeneratorService = {
      getRenderedBuffer: jasmine.createSpy('getRenderedBuffer').and.returnValue(Promise.resolve(new AudioBuffer( {
        length: 10,
        numberOfChannels: 2,
        sampleRate: 44000
      })))
    };

    TestBed.configureTestingModule({
      providers: [
        SoundService,
        {
          provide: SoundGeneratorService,
          useValue: mockSoundGeneratorService
        },
        LoadingBarService
      ]
    });

    soundService = TestBed.inject(SoundService);
    soundGeneratorService = TestBed.inject(SoundGeneratorService);
  });

  it("should create the sound service", () => {
    expect(soundService).toBeTruthy();
  });

  it("should call the soundGenerator once when play twice", async () => {
    await soundService.playPause();//play
    await soundService.playPause();//pause
    await soundService.playPause();//play
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(soundGeneratorService.getRenderedBuffer).toHaveBeenCalledTimes(1);
  });
})

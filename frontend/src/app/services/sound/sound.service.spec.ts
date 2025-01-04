import { SoundService } from "./sound.service";
import {SoundGeneratorService} from "./sound-generator.service";
import { TestBed } from "@angular/core/testing";
import {LoadingBarService} from "@ngx-loading-bar/core";

describe("sound", () => {
  let mockSoundGeneratorService: Partial<SoundGeneratorService>;
  let soundService: SoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SoundService,
        { provide: SoundGeneratorService, useValue: mockSoundGeneratorService },
        LoadingBarService
      ]
    });

    soundService = TestBed.inject(SoundService);
  });

  it("should create the sound service", () => {
    expect(soundService).toBeTruthy();
  });
})

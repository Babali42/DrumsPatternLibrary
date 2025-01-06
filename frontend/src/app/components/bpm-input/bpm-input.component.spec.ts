import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpmInputComponent } from './bpm-input.component';
import {By} from "@angular/platform-browser";

describe('BpmInputComponent', () => {
  let component: BpmInputComponent;
  let fixture: ComponentFixture<BpmInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BpmInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BpmInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment the bpm in the desired range', () => {
    component.maxBpm = 130;
    component.bpm = 128;
    component.incrementBpm();
    component.incrementBpm();
    component.incrementBpm();
    expect(component.bpm).toEqual(component.maxBpm);
  });

  it('should decrement the bpm in the desired range', () => {
    component.minBpm = 126;
    component.bpm = 128;
    component.decrementBpm();
    component.decrementBpm();
    component.decrementBpm();
    expect(component.bpm).toEqual(component.minBpm);
  });

  it('should update the value', () => {
    component.bpm = 128;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const inputElement = fixture.debugElement.query(By.css('.number-quantity')).nativeElement;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    inputElement.value = '120';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
    inputElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.bpm).toBe(120);
  });
});

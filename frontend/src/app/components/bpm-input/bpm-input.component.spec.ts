import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpmInputComponent } from './bpm-input.component';

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
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashCardStepperComponent } from './flash-card-stepper.component';

describe('FlashCardStepperComponent', () => {
  let component: FlashCardStepperComponent;
  let fixture: ComponentFixture<FlashCardStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashCardStepperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashCardStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseCurrentComponent } from './exercise-current.component';

describe('ExerciseCurrentComponent', () => {
  let component: ExerciseCurrentComponent;
  let fixture: ComponentFixture<ExerciseCurrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseCurrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

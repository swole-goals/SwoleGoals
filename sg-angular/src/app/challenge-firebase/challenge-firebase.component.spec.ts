import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeFirebaseComponent } from './challenge-firebase.component';

describe('ChallengeFirebaseComponent', () => {
  let component: ChallengeFirebaseComponent;
  let fixture: ComponentFixture<ChallengeFirebaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeFirebaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeFirebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

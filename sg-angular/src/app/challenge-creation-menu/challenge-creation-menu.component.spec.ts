import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeCreationMenuComponent } from './challenge-creation-menu.component';

describe('ChallengeCreationMenuComponent', () => {
  let component: ChallengeCreationMenuComponent;
  let fixture: ComponentFixture<ChallengeCreationMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeCreationMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeCreationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

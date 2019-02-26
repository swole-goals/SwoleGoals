import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubStatsComponent } from './github-stats.component';

describe('GithubStatsComponent', () => {
  let component: GithubStatsComponent;
  let fixture: ComponentFixture<GithubStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GithubStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreBar } from './score-bar';

describe('ScoreBar', () => {
  let component: ScoreBar;
  let fixture: ComponentFixture<ScoreBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreBar],
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyStatistics } from './daily-statistics';

describe('DailyStatistics', () => {
  let component: DailyStatistics;
  let fixture: ComponentFixture<DailyStatistics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyStatistics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyStatistics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component } from '@angular/core';
import { StatisticsTableComponent } from '../statistics-table/statistics-table';
import { PaginatorComponent } from '../paginator/paginator';
import { DailyStatisticsService } from '../services/dailyStatisticsService';
import { DailyStatisticsSummary, Pagination } from '../models/daily-statistics.model';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, switchMap } from 'rxjs';

interface PageInfo {
  pageNumber: number;
  pageSize: number;
}

@Component({
  selector: 'app-daily-statistics',
  standalone: true,
  imports: [StatisticsTableComponent, PaginatorComponent, CommonModule],
  templateUrl: './daily-statistics.html',
  styleUrl: './daily-statistics.css',
})
export class DailyStatisticsComponent {
  private pageInfo$ = new BehaviorSubject<PageInfo>({ pageNumber: 0, pageSize: 10 });
  readonly statistics$ = this.pageInfo$.pipe(
  switchMap(({ pageNumber, pageSize }) => 
    this.dailyStatisticsService.getDailyStatistics(pageNumber, pageSize)
  )
);

constructor(private dailyStatisticsService: DailyStatisticsService) {}

onPageChange(event: { pageNumber: number; pageSize: number }) {
    this.pageInfo$.next(event);
  }

}

import { Component, Input} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { DailyStatisticsSummary} from '../models/daily-statistics.model';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistics-table',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './statistics-table.html',
  styleUrl: './statistics-table.css',
  providers: [DatePipe]

})
export class StatisticsTableComponent {
  constructor(private datePipe: DatePipe){}
  displayedColumns: string[] = ['date', 'totalConsumption', 'totalProduction', 'averagePrice', 'longestNegativePriceHours'];
  @Input() statistics: DailyStatisticsSummary[] = []

  round(value: number): number {
    return Math.round(value * 100) / 100;
  }

  formatDate(dateString: string): string | null {
    return this.datePipe.transform(dateString, 'd-M-yyyy');
  }

}

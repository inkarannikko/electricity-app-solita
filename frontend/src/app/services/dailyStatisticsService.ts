  import { BehaviorSubject, Observable, map, tap } from "rxjs";
  import { HttpClient } from "@angular/common/http"; 
  import { DailyStatisticsResponse } from "../models/daily-statistics.model"; 
  import { of } from "rxjs";
  import { Injectable } from "@angular/core";
  
  @Injectable({
  providedIn: 'root'
  })

  export class DailyStatisticsService {
    private readonly apiUrl = 'http://localhost:3000/api/daily-statistics';
    private subject = new BehaviorSubject<DailyStatisticsResponse | null>(null);
    dailyStatistics$ = this.subject.asObservable();

    private mockResponse: DailyStatisticsResponse = {
    pagination: {
      page: 1,
      pageSize: 10,
      totalDays: 100,
    },
    data: [
      {
        date: new Date('2025-01-01'),
        totalConsumption: 120000,
        totalProduction: 135000,
        averagePrice: -2.5,
        longestNegativePriceStreak: 4
      },
    {
      date: new Date('2025-01-02'),
      totalConsumption: 110000,
      totalProduction: 125000,
      averagePrice: 3.1,
      longestNegativePriceStreak: 0
    },
    {
      date: new Date('2025-01-03'),
      totalConsumption: 115000,
      totalProduction: 130000,
      averagePrice: 1.8,
      longestNegativePriceStreak: 2
    },
    {
      date: new Date('2025-01-04'),
      totalConsumption: 125000,
      totalProduction: 140000,
      averagePrice: -0.5,
      longestNegativePriceStreak: 3
    },
    {
      date: new Date('2025-01-05'),
      totalConsumption: 118000,
      totalProduction: 132000,
      averagePrice: 2.2,
      longestNegativePriceStreak: 1
    },
    {
      date: new Date('2025-01-06'),
      totalConsumption: 122500,
      totalProduction: 137000,
      averagePrice: 0.7,
      longestNegativePriceStreak: 0
    },
    {
      date:  new Date('2025-01-07'),
      totalConsumption: 119000,
      totalProduction: 133500,
      averagePrice: -1.2,
      longestNegativePriceStreak: 2
      },
    {
      date: new Date('2025-01-08'),
      totalConsumption: 121000,
      totalProduction: 136000,
      averagePrice: 2.5,
      longestNegativePriceStreak: 1
    },
    {
      date: new Date('2025-01-09'),
      totalConsumption: 117500,
      totalProduction: 131000,
      averagePrice: -0.8,
      longestNegativePriceStreak: 3
    },
    {
      date: new Date('2025-01-10'),
      totalConsumption: 124000,
      totalProduction: 138500,
      averagePrice: 1.5,
      longestNegativePriceStreak: 0
    }
    ],
  };

    constructor(private http: HttpClient){}

    getDailyStatistics(page: Number, pageSize: Number): Observable<DailyStatisticsResponse> {
    return this.http.get<DailyStatisticsResponse>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`)
      .pipe(
        tap(response => this.subject.next(response))
      );
   
      /*return of(this.mockResponse).pipe(
      tap(response => this.subject.next(response)));*/
  }
}
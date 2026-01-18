export interface HourlyData {
  startTime: Date;
  productionAmount: number | null;
  consumptionAmount: number | null;
  hourlyPrice: number | null;
}

export interface DailyStatistics {
  date: Date;
  hours: HourlyData[];
}

export interface DailyStatisticsSummary {
  date: Date;
  totalConsumption: number;
  totalProduction: number;
  averagePrice: number;
  longestNegativePriceStreak: number;
}

export interface Pagination {
    page: number;
    pageSize: number;
    totalDays: number;
}

export interface DailyStatisticsResponse {
    pagination: Pagination;
    data: DailyStatisticsSummary[];
}
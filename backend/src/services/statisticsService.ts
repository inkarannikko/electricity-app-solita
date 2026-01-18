import { DailyStatisticsSummary, Pagination, DailyStatisticsResponse } from "../models/statistics";
import { fetchDailyStatistics } from "../repositories/statisticsRepository";

export interface RowFromDb {
  date: Date;
  starttime: Date;
  productionamount: string | null;
  consumptionamount: string | null;
  hourlyprice: string | null;
}

interface DayAggregate {
    totalProduction: number;
    totalConsumption: number;
    priceSum: number;
    priceCount: number;
    longestNegativePriceStreak: number;
    currentNegativeStreak: number;
 }
 
export const getDailyStatistics = async (page: number,
	pageSize: number) =>  {

	const offset = page * pageSize;
    
	const result =  await fetchDailyStatistics(pageSize, offset);
	const totalDays = Number(result.totalDays);

	const data = mapRowsToDailyStatisticsSummary(result.data);

	const pagination: Pagination = {
		page,
		pageSize,
		totalDays,
	};

	const response: DailyStatisticsResponse = {
		pagination,
		data
	};
	return response;
};

  
const mapRowsToDailyStatisticsSummary = (rows: RowFromDb[]): DailyStatisticsSummary[] => {
	const map = new Map<string, DayAggregate>();

	for (const row of rows) {
  	const dateKey = row.date.toISOString().split("T")[0];
  	if (!map.has(dateKey)) { 
  		map.set(dateKey, {
  			totalProduction: 0,
  			totalConsumption: 0,
  			priceSum: 0,
  			priceCount: 0,
  			longestNegativePriceStreak: 0,
  			currentNegativeStreak: 0,
  		});
		}

  	const day = map.get(dateKey)!; 

  	if (row.productionamount !== null) {
  		day.totalProduction += Number(row.productionamount);
  	}

  	if (row.consumptionamount !== null) {
  		day.totalConsumption += Number(row.consumptionamount);
  	}

  	if (row.hourlyprice !== null) {
  		day.priceSum += Number(row.hourlyprice);
  		day.priceCount++;
  		if (Number(row.hourlyprice) < 0) {
  			day.currentNegativeStreak++;
  			day.longestNegativePriceStreak = Math.max(day.longestNegativePriceStreak, day.currentNegativeStreak);
  		} 
  		else {
  			day.currentNegativeStreak = 0;
  		}
  	}
    
	}
	const result: DailyStatisticsSummary[] = Array.from(map.entries()).map(([date, day]) => ({
		date: new Date(date),
		totalProduction: day.totalProduction,
		totalConsumption: day.totalConsumption,
		averagePrice: day.priceCount > 0 ? day.priceSum / day.priceCount : 0,
		longestNegativePriceStreak: day.longestNegativePriceStreak,
	}));

	return result;
};
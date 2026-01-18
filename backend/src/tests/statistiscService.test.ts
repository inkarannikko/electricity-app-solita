import { getDailyStatistics } from "../services/statisticsService";
import * as repo from "../repositories/statisticsRepository";
import { RowFromDb } from "../services/statisticsService";

jest.mock("../repositories/statisticsRepository");

const rows: RowFromDb[] = [
	{ date: new Date("2026-01-01"), starttime: new Date("2026-01-10T00:00:00Z"), productionamount: "1000", consumptionamount: "500", hourlyprice: "2" },
	{ date: new Date("2026-01-01"), starttime: new Date("2026-01-10T02:00:00Z"), productionamount: "1500", consumptionamount: "300", hourlyprice: "-1" },
	{ date: new Date("2026-01-01"), starttime: new Date("2026-01-10T03:00:00Z"), productionamount: "2000", consumptionamount: "200", hourlyprice: "3" },
	{ date: new Date("2026-01-01"), starttime: new Date("2026-01-10T04:00:00Z"), productionamount: "1000", consumptionamount: "500", hourlyprice: "-1" },
	{ date: new Date("2026-01-01"), starttime: new Date("2026-01-10T05:00:00Z"), productionamount: "1000", consumptionamount: "200", hourlyprice: "-2" },
	{ date: new Date("2026-01-02"), starttime: new Date("2026-01-10T00:00:00Z"), productionamount: "3000", consumptionamount: "1000", hourlyprice: "3" },
];

describe("getDailyStatistics", () => {
	const mockFetchDailyStatistics = repo.fetchDailyStatistics as jest.Mock;
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should return paginated daily statistics", async () => {
		mockFetchDailyStatistics .mockResolvedValue({
			data: rows,
			totalDays: 2,
		});
		const response = await getDailyStatistics(0, 10);
		expect(mockFetchDailyStatistics).toHaveBeenCalledWith(10,0);
		expect(response.pagination.page).toBe(0);
		expect(response.pagination.pageSize).toBe(10);
		expect(response.pagination.totalDays).toBe(2);
	});

	it("should calculate total production and consumption amounts correctly", async() => {
		mockFetchDailyStatistics .mockResolvedValue({
			data: rows,
			totalDays: 2,
		});
		const response = await getDailyStatistics(1, 10);
		expect(response.data[0].totalProduction).toBe(6500);
		expect(response.data[0].totalConsumption).toBe(1700);     
	});

	it("should calculate average price and longest negatice hour price streak correctly", async() => {
		mockFetchDailyStatistics .mockResolvedValue({
			data: rows,
			totalDays: 2,
		});
		const response = await getDailyStatistics(1, 10);
		expect(response.data[0].averagePrice).toBe(0.2);
		expect(response.data[0].longestNegativePriceStreak).toBe(2);     
	});

	it("should handle null values correctly", async () => {
		const rows: RowFromDb[] = [
			{ date: new Date("2026-01-03"), starttime: new Date(), productionamount: null, consumptionamount: null, hourlyprice: null },
		];
		mockFetchDailyStatistics.mockResolvedValue({
			data: rows,
			totalDays: 1,
		});

		const response = await getDailyStatistics(1, 10);

		const day = response.data[0];
		expect(day.totalProduction).toBe(0);
		expect(day.totalConsumption).toBe(0);
		expect(day.averagePrice).toBe(0);
		expect(day.longestNegativePriceStreak).toBe(0);
	});
});
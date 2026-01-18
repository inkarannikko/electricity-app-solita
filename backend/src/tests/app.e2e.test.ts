import request from "supertest";
import app from "../index";
import { DailyStatisticsSummary} from "../models/statistics";

describe("Electricity data API (E2E)", () => {

	it("should return paginated daily statistics", async () => {
		const res = await request(app)
			.get("/api/daily-statistics?page=0&pagSize=10")
			.expect(200);

		expect(typeof res.body).toBe("object");
   
		expect(res.body).toHaveProperty("pagination");
		const { pagination } = res.body;
		expect(pagination.page).toBe(0);
		expect(pagination.pageSize).toBe(10);
		expect(typeof pagination.totalDays).toBe("number");

		expect(Array.isArray(res.body.data)).toBe(true);
		expect(res.body.data.length).toBeLessThanOrEqual(pagination.pageSize);
		res.body.data.forEach((item: DailyStatisticsSummary) => {
			expect(item).toHaveProperty("date");

			expect(item).toHaveProperty("totalConsumption");
			expect(typeof item.totalConsumption).toBe("number");

			expect(item).toHaveProperty("totalProduction");
			expect(typeof item.totalProduction).toBe("number");

			expect(item).toHaveProperty("averagePrice");
			expect(typeof item.averagePrice).toBe("number");

			expect(item).toHaveProperty("longestNegativePriceStreak");
			expect(typeof item.longestNegativePriceStreak).toBe("number");
		});


	});
});

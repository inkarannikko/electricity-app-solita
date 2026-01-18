import { Request, Response, NextFunction } from "express";
import { getDailyStatistics } from "../services/statisticsService";

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE = 0;

export const fecthDailyStatisticsController = async (req: Request, res: Response, next: NextFunction) => {
	try {

		let page = req.query.page ? Number(req.query.page) : DEFAULT_PAGE;
		const pageSize = req.query.pageSize ? Number(req.query.pageSize): DEFAULT_PAGE_SIZE;

		if (isNaN(page) || page < 1) page = DEFAULT_PAGE;
		if (isNaN(pageSize) || pageSize < 1) page = DEFAULT_PAGE_SIZE;

		const result = await getDailyStatistics(
			page,
			pageSize,
		);

		res.status(200).json(result);
	}

	catch(error) {
		next(error);
	}
};
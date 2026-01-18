import { Pool } from "pg"; 
import config from "../config/config";

const pool = new Pool(config.databaseConfig);

const QUERY = `
  WITH selected_days AS (
    SELECT DISTINCT date
    FROM "electricitydata"
    ORDER BY date DESC
    LIMIT $1 OFFSET $2
  )
  SELECT
      e.date,
      e.startTime,
      e.productionAmount,
      e.consumptionAmount,
      e.hourlyPrice
  FROM "electricitydata" e
  JOIN selected_days d ON e.date = d.date
  ORDER BY e.date DESC, e.startTime;
  `;

const COUNT_QUERY = `
    SELECT COUNT(DISTINCT date)
    FROM "electricitydata";
  `;

export const fetchDailyStatistics = async (limit: number, offset: number) =>  {
	const [{rows}, countResult] = await Promise.all([pool.query(QUERY, [limit, offset]), pool.query(COUNT_QUERY)]);
	return {
		data: rows,
		totalDays: countResult.rows[0].count
	};
};
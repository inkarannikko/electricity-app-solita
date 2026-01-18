import { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
  status: number;
  code?: string;
}

export const errorHandler = (
	err: AppError,
	req: Request,
	res: Response,
 	 _next: NextFunction // eslint-disable-line
) => {
	console.error(err); // eslint-disable-line
	if (err.code === "ECONNREFUSED") {
		res.status(503).json({
			message: "Cannot connec to database."
		});
	} else {
		res.status(err.status || 500).json({
			message: err.message || "Internal Server Error",
		});}
};
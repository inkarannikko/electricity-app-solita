import dotenv from "dotenv";
import { PoolConfig } from "pg";

dotenv.config();

const runConfig = {
	port: process.env.PORT
};

const databaseConfig: PoolConfig = {
	port: Number(process.env.DB_PORT),
	host: String(process.env.DB_HOST),
	user: String(process.env.DB_USER),
	database: String(process.env.DB_NAME),
	password: String(process.env.DB_PASSWORD),
};

export default {runConfig, databaseConfig};
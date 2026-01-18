import { Router } from "express";
import { fecthDailyStatisticsController} from "../controllers/statisticsController";

const router = Router();

router.get("/", fecthDailyStatisticsController);

export default router;
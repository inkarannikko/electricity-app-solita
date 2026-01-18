import express from "express";
import  routes  from "./routes/routes";
import config from "./config/config";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = config.runConfig.port;

app.use("/api/daily-statistics", routes);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`); // eslint-disable-line
});

export default app;
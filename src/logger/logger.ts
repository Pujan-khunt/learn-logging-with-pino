import pino from "pino";
import config from "../config/envConfig.js";

const logger = pino({
	level: config.LOG_LEVEL,
});

export default logger;

import type { NextFunction, Request, Response } from "express";
import { v7 as uuid } from "uuid";
import logger from "../logger/logger.js";

const loggingMiddleware = (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	const requestId = uuid();

	// Create a child logger with the requestId field attached.
	req.log = logger.child({ requestId });
	req.log.info({ req }, "Incoming request is attached with Pino logger.");
	next();
};

export default loggingMiddleware;

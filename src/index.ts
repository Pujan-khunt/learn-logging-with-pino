import e from "express";
import loggingMiddleware from "./middlewares/logger.middleware.js";
import type { Request, Response } from "express";
import config from "./config/envConfig.js";
import logger from "./logger/logger.js";

const app = e();

app.use(e.json()); // ✅ parses application/json requests
app.use(e.urlencoded({ extended: true })); // ✅ parses form-urlencoded requests

app.use(loggingMiddleware);

app.post("/users", async (req: Request, res: Response) => {
	const { username, password } = req.body;

	req.log.debug({ username }, "Attempting to create a new user.");

	if (!username || !password) {
		req.log.warn("User creation failed due to missing username or password.");
		return res.status(400).json({
			message: "Missing Fields",
		});
	}

	try {
		// db.createUser(...) would go here
		if (username === "error") {
			throw new Error("Simulated database connection error");
		}

		const newUser = { id: 1, username };
		req.log.info({ userId: newUser.id }, "User created successfully");
		res.status(201).send(newUser);
	} catch (err) {
		// ❌ ERROR: The operation failed. Note how we log the error object
		// which includes the stack trace.
		req.log.error({ err }, "Failed to save user to the database");
		res.status(500).send({ message: "Internal Server Error" });
	}

	return;
});

app.post("/log-level", (req: Request, _res: Response) => {
	const logLevel = req.body;
	if (["debug", "info", "warn", "error", "fatal"].includes(logLevel)) {
		req.log.level = logLevel;
	}
});

// A route to simulate a critical failure
app.get("/crash", (req, _res) => {
	// FATAL: Log the reason for the crash and then exit.
	// A process manager like PM2 would restart the app.
	req.log.fatal("Deliberate crash initiated. Shutting down!");
	process.exit(1);
});

app.listen(config.PORT, "localhost", (error: Error | undefined) => {
	if (error !== undefined) {
		logger.fatal("Server couldn't start. Error Message: " + error.message);
	} else {
		logger.info(`Server running on port: ${config.PORT}`);
	}
});

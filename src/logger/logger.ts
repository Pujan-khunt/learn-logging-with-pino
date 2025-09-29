import pino, { destination } from "pino";
import config from "../config/envConfig.js";
import type { User } from "../types/index.js";
import path from "path";
import { existsSync, mkdirSync } from "fs";

function userSerializer(user: User): User {
	return {
		id: user.id,
		// Redacting sensitive information
		name: "***",
		email: user.email.replace(/(.{2})(.*)(@.*)/, "$1***$3"),
	};
}

const logDirectory = path.join(__dirname, "..", "logs");
if (!existsSync(logDirectory)) {
	mkdirSync(logDirectory);
}
const logFile = path.join(logDirectory, "app.log");

const pinoTransport = pino.transport({
	targets: [
		{
			level: "info",
			target: "pino/file",
			options: {
				destination: logFile,
			},
		},
	],
});

const logger = pino(pinoTransport);

// const logger = pino({
//   level: config.LOG_LEVEL,
//   serializers: {
//     user: userSerializer,
//   },
//   transport: {
//     target: "pino-pretty",
//     options: {
//       colorize: true,
//     },
//   },
// });

const users: User[] = [
	{
		id: 1,
		name: "Pujan Khunt",
		email: "pujankhunt2412@gmail.com",
	},
];

for (const user of users) {
	logger.info({ user });
}

export default logger;

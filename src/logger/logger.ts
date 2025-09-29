import pino from "pino";
import config from "../config/envConfig.js";
import type { User } from "../types/index.js";

function userSerializer(user: User): User {
	return {
		id: user.id,
		// Redacting sensitive information
		name: "***",
		email: user.email.replace(/(.{2})(.*)(@.*)/, "$1***$3"),
	};
}

const logger = pino({
	level: config.LOG_LEVEL,
	serializers: {
		user: userSerializer,
	},
});

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

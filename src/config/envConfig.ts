import "dotenv/config";

interface EnvConfig {
	PORT: number;
	LOG_LEVEL: "debug" | "info" | "warn" | "error" | "fatal";
}

const getPort = () => {
	return parseInt(process.env["PORT"] ?? "3000", 10);
};

const getLogLevel = (): EnvConfig["LOG_LEVEL"] => {
	const logLevel = process.env["LOG_LEVEL"];

	// Check if the provided level is one of the allowed values
	if (
		logLevel === "debug" ||
		logLevel === "info" ||
		logLevel === "warn" ||
		logLevel === "error" ||
		logLevel === "fatal"
	) {
		return logLevel;
	}

	// Return default value of "info" if no proper level is provided.
	return "info";
};

const config: EnvConfig = {
	PORT: getPort(),
	LOG_LEVEL: getLogLevel(),
};

export default config;

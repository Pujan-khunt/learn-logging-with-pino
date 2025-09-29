- Pino is a library which asynchronously logs logs as opposed to the console.log or console.error from node.js which synchronously logs on TTY which could exceptionally increase latency spikes.

- Pino is benchmarked to be 10x faster than console.log() and console.error()

- Never log files manually. In modern cloud environments (Kubernetes) with docker, applications shoud log to stdout. The environments logging agent is responsible for collecing the logs, forwardding etc.

- Never log sensitive information like someone's personal identity information.

- You can use a pretty printer in development. eg. pino-pretty in npm registry.

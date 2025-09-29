- Pino is a library which asynchronously logs logs as opposed to the console.log or console.error from node.js which synchronously logs on TTY which could exceptionally increase latency spikes.

- Pino is benchmarked to be 10x faster than console.log() and console.error()

- Never log files manually. In modern cloud environments (Kubernetes) with docker, applications shoud log to stdout. The environments logging agent is responsible for collecing the logs, forwardding etc.

- Never log sensitive information like someone's personal identity information.

- You can use a pretty printer in development. eg. pino-pretty in npm registry.

- Log level can be changed at runtime

- Pino used to use a different process to perform the actual logging task, but has now shifted to use a worker thread.
```bash
# Example
node ./dist/index.js | pino-pretty
```

The problem with this approach is the buffer capacity of the pipe. If the writing process is writing faster than the reading process reads,
then the buffer is bound to fill up and the main writing process (node ./dist/index.js) will get blocked until the reading process(pino-pretty) empties a 
portion of the in-memory temporary buffer that the pipe has created.

2 processes instead of one complicates `Dockerfile`s and also process management configuration with `PM2`.

IPC communication using pipes and stdio is slower than communicating within the same process using threads.

For these reasons, Pino shifted to worker_threads, which enables shifting the work to a separate thread inside the same process.


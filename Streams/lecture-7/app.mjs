// piping and redirection of data streams -> connecting one process stdin/stdout to another process stdin/stdout

// we will pass a stdin from out terminal and will catch it in our node process

process.stdin.on('data', (chunk) => {
    console.log(chunk.toString());
})

// fromm terminal we will give stdin (echo "Hello, world" | node app.mjs)
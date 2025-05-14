module.exports = {
    apps: [
        {
            name: "notification-grpc-local",
            script: "./src/grpc/grpc.server.js",
            watch: false,
            env: {
                NODE_ENV: "local"
            },
            instances: 1
        }
    ]
}

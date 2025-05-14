module.exports = {
    apps: [
        {
            name: "notification-grpc-dev",
            script: "./src/grpc/grpc.server.js",
            watch: false,
            env: {
                NODE_ENV: "dev"
            },
            instances: 1
        }
    ]
}

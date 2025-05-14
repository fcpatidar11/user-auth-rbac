module.exports = {
    apps: [
        {
            name: "notification-grpc-prod",
            script: "./src/grpc/grpc.server.js",
            watch: false,
            env: {
                NODE_ENV: "prod"
            },
            instances: 1
        }
    ]
}

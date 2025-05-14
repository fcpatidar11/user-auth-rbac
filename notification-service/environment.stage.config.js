module.exports = {
    apps: [
        {
            name: "notification-grpc-stage",
            script: "./src/grpc/grpc.server.js",
            watch: false,
            env: {
                NODE_ENV: "stage"
            },
            instances: 1
        }
    ]
}

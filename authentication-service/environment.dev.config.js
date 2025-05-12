module.exports = {
    apps: [
        {
            name: "captive-authentication-grpc-dev",
            script: "./src/grpc/grpc.server.js",
            watch: false,
            env: {
                NODE_ENV: "dev"
            },
            instances: 1
        }
    ]
}

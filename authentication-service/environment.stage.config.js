module.exports = {
    apps: [
          {
              name: "captive-authentication-grpc-stage",
              script: "./src/grpc/grpc.server.js",
              watch: false,
              env: {
                  NODE_ENV: "stage"
              },
              instances: 1
          }
      ]
  }
  
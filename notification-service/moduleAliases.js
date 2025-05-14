// module-aliases.js
const path = require('path');
const moduleAlias = require("module-alias");

moduleAlias.addAliases({
  "@lib": path.resolve(__dirname, "lib"),
  "@docs": path.resolve(__dirname, "docs"),
  "@database": path.resolve(__dirname, "lib/database"),
  "@mailer": path.resolve(__dirname, "lib/mailer-lib"),
  "@shared": path.resolve(__dirname, "shared"),
  "@configs": path.resolve(__dirname, "shared/configs"),
  "@constants": path.resolve(__dirname, "shared/constants"),
  "@messages": path.resolve(__dirname, "shared/messages"),
  "@utils": path.resolve(__dirname, "shared/utils"),
  "@loggers": path.resolve(__dirname, "shared/utils/loggers"),
  "@templates": path.resolve(__dirname, "shared/utils/templates"),
  "@src": path.resolve(__dirname, "src"),
  "@api": path.resolve(__dirname, "src/api"),
  "@controllers": path.resolve(__dirname, "src/api/controllers"),
  "@middlewares": path.resolve(__dirname, "src/api/middlewares"),
  "@routes": path.resolve(__dirname, "src/api/routes"),
  "@interceptors": path.resolve(__dirname, "src/grpc/interceptors"),
  "@grpcDir": path.resolve(__dirname, "src/grpc"),
  "@connectors": path.resolve(__dirname, "src/grpc/connectors"),
  "@services": path.resolve(__dirname, "src/grpc/services"),
  "@models": path.resolve(__dirname, "src/grpc/models"),
  "@helpers": path.resolve(__dirname, "src/grpc/helpers"),
  "@formatters": path.resolve(__dirname, "src/formatters"),
  "@migrations": path.resolve(__dirname, "src/migrations")
});

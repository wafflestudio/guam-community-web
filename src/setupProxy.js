// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/v1", {
      target: "https://guam.jon-snow-korea.com/community/api/v1",
      changeOrigin: true,
    })
  );
};

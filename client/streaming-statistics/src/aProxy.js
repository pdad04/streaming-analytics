const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/api"], {
      target: "https://streaming-analytics.onrender.com",
      changeOrigin: true,
    })
  );
};

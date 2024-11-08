const canvas = require("./api/canvas");

module.exports = (app) => {
  app.use("/api/canvas", canvas);
};

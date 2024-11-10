const course = require("./api/course");
const prediction = require("./api/prediction");

module.exports = (app) => {
  app.use("/api/predictions", prediction);
  app.use("/api/courses", course);
};

const course = require("./api/course");

module.exports = (app) => {
  app.use("/api/courses", course);
};

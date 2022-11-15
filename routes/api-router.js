const categoriesRouter = require("./categories-router");
const apiRouter = require("express").Router();

apiRouter.route("/").get((req, res) => {
  message = "ALL OK from GET /api";
  res.status(200).send({ message });
});

apiRouter.use("/categories", categoriesRouter);

module.exports = apiRouter;

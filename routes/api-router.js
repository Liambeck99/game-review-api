const categoriesRouter = require("./categories-router");
const reveiwsRouter = require("./reviews-router");
const apiRouter = require("express").Router();

apiRouter.route("/").get((req, res) => {
  const message = "ALL OK from GET /api";
  res.status(200).send({ message });
});

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reveiwsRouter);

module.exports = apiRouter;

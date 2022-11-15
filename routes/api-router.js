const apiRouter = require("express").Router();

apiRouter.get("/", (req, res) => {
  message = "ALL OK from GET /api";
  res.status(200).send({ message });
});

module.exports = apiRouter;

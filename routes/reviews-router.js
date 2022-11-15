const reviews = require("../db/data/test-data/reviews");
const { selectReviews } = require("../methods/reviews");

const reveiwsRouter = require("express").Router();

reveiwsRouter.route("/").get((req, res) => {
  selectReviews().then((reviews) => {
    res.status(200).send({ reviews });
  });
});

module.exports = reveiwsRouter;

const { selectReviews, selectReview } = require("../methods/reviews");

const reviewsRouter = require("express").Router();

reviewsRouter.route("/").get((req, res) => {
  selectReviews().then((reviews) => {
    res.status(200).send({ reviews });
  });
});

reviewsRouter.route("/:review_id").get((req, res) => {
  const { review_id } = req.params;

  selectReview(review_id).then((review) => {
    res.status(200).send({ review });
  });
});

module.exports = reviewsRouter;

const {
  selectReviews,
  selectReview,
  selectReviewComments,
  createReviewComment,
} = require("../methods/reviews");

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

reviewsRouter
  .route("/:review_id/comments")
  .get((req, res) => {
    const { review_id } = req.params;

    selectReviewComments(review_id).then((comments) => {
      res.status(200).send({ comments });
    });
  })
  .post((req, res) => {
    const { review_id } = req.params;
    const newComment = req.body;

    createReviewComment(review_id, newComment).then((comment) => {
      res.status(201).send({ comment });
    });
  });

module.exports = reviewsRouter;

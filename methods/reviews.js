const db = require("../db/connection");
const format = require("pg-format");

exports.selectReviews = () => {
  const queryStr = `
  SELECT 
    reviews.category,
    reviews.created_at,
    reviews.designer,
    reviews.owner,
    reviews.review_id,
    reviews.review_img_url,
    reviews.title,
    reviews.votes,
    COUNT(*) AS comment_count
  FROM reviews
  LEFT JOIN comments ON comments.review_id = reviews.review_id
  GROUP BY
    reviews.review_id
  ORDER BY reviews.created_at DESC
  ;`;

  return db.query(queryStr).then((result) => {
    return result.rows;
  });
};

exports.selectReview = (review_id) => {
  const queryStr = format(
    `
    SELECT 
        reviews.category,
        reviews.created_at,
        reviews.designer,
        reviews.owner,
        reviews.review_id,
        reviews.review_img_url,
        reviews.title,
        reviews.votes,
        COUNT(*) AS comment_count
    FROM reviews
    LEFT JOIN comments ON comments.review_id = reviews.review_id
    WHERE reviews.review_id = %s
    GROUP BY 
        reviews.review_id
    ;`,
    `'${review_id}'`
  );

  return db.query(queryStr).then((result) => {
    return result.rows[0];
  });
};

exports.selectReviewComments = (review_id) => {
  const queryStr = format(
    `SELECT * FROM comments WHERE review_id = %s`,
    review_id
  );

  return db.query(queryStr).then((result) => {
    return result.rows;
  });
};

exports.createReviewComment = (review_id, new_comment) => {
  // console.log(new_comment.body);
  let queryStr = format(
    `
  INSERT INTO comments
  (body, review_id, author, votes, created_at)
  VALUES
  (%L, %L, %L, %L, %L)
  RETURNING *;
  `,
    new_comment.body,
    review_id,
    new_comment.username,
    0,
    new Date(Date.now())
  );

  return db.query(queryStr).then((result) => {
    return result.rows[0];
  });
};

exports.updateReview = (review_id, update) => {
  const queryStr = format(
    `
  UPDATE reviews
  SET votes = votes + %L
  WHERE review_id = %L
  RETURNING *;
  `,
    update.inc_votes,
    review_id
  );

  return db.query(queryStr).then((result) => {
    return result.rows[0];
  });
};

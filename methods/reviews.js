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

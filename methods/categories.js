const db = require("../db/connection");
const format = require("pg-format");

exports.selectCategories = () => {
  const queryStr = `SELECT * FROM categories`;
  return db.query(queryStr).then((result) => {
    return result.rows;
  });
};

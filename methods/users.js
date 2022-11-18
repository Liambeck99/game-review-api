const db = require("../db/connection");
const format = require("pg-format");

exports.selectUsers = () => {
  const queryStr = "SELECT * FROM users;";

  return db.query(queryStr).then((result) => {
    return result.rows;
  });
};

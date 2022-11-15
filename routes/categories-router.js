const { selectCategories } = require("../methods/categories");

const categoriesRouter = require("express").Router();

categoriesRouter.route("/").get((req, res) => {
  selectCategories().then((categories) => {
    res.status(200).send({ categories });
  });
});

module.exports = categoriesRouter;

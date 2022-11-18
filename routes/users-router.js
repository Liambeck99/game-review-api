const { selectUsers } = require("../methods/users");

const userRouter = require("express").Router();

userRouter.route("/").get((req, res) => {
  selectUsers().then((users) => {
    res.status(200).send({ users });
  });
});

module.exports = userRouter;

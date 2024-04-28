const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to Blog application" });
});

router.use("/users", require("./user.routes"));
router.use("/posts", require("./post.routes"));
router.use("/comments", require("./comment.routes"));
router.use("/categories", require("./category.routes"));

module.exports = router;

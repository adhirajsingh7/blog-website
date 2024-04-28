const { post_controller } = require("../controllers");
const { user_verification } = require("../middlewares/auth");

const router = require("express").Router();

router.get("/", post_controller.get_all_posts)

router
  .route("/:user_id")
  .get(post_controller.get_user_posts)
  .post(post_controller.create_post);

router
  .route("/:user_id/:post_id")
  .get(post_controller.get_post_by_id)
  .put(post_controller.edit_post)
  .delete(post_controller.archive_post)
  .patch(post_controller.restore_post);

module.exports = router;

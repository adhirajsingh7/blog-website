const { comment_controller } = require("../controllers");
const router = require("express").Router();

router.get("/", comment_controller.get_all_comments)

router
  .route("/:post_id")
  .get(comment_controller.get_post_comments)
  .post(comment_controller.create_comment);

router
  .route("/:post_id/:comment_id")
  .get(comment_controller.get_comment_by_id)
  .put(comment_controller.edit_comment)
  .delete(comment_controller.archive_comment)
  .patch(comment_controller.restore_comment);

module.exports = router;

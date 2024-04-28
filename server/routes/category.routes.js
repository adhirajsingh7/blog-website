const { category_controller } = require("../controllers");

const router = require("express").Router();

router.get("/:post_id/post", category_controller.get_post_categories)

router
  .route("/")
  .get(category_controller.get_all_categories)
  .post(category_controller.create_category);

router
  .route("/:category_id")
  .get(category_controller.get_category_by_id)
  .put(category_controller.edit_category)
  .delete(category_controller.archive_category)
  .patch(category_controller.restore_category);

module.exports = router;

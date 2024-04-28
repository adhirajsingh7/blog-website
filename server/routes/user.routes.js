const { user_controller } = require("../controllers");
const { user_verification } = require("../middlewares/auth");

const router = require("express").Router();

router
  .route("/")
  .get(user_controller.get_users)
  .post(user_controller.create_user);

router
  .route("/:user_id")
  .get(user_controller.get_user_by_id)
  .put(user_controller.edit_user)
  .delete(user_controller.archive_user)
  .patch(user_controller.restore_user);

router.post("/session/login", user_controller.login_user);
router.post("/session/signup", user_controller.signup_user);
router.get("/session/logout", user_controller.logout_user);

module.exports = router;

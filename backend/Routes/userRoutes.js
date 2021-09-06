const express = require("express");
const router = express.Router();

const userController = require("../controller/userControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", userController.authUser);
router
  .route("/")
  .get(authMiddleware.protect, authMiddleware.admin, userController.getUsers)
  .post(
    authMiddleware.protect,
    authMiddleware.admin,
    userController.registerUser
  );

router
  .route("/:id")
  .delete(
    authMiddleware.protect,
    authMiddleware.admin,
    userController.deleteUser
  );

const userRoutes = router;

module.exports = userRoutes;

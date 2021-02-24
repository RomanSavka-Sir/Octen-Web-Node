const router = require("express").Router();

const userController = require("../controller/user/user.controller");
const userMiddleware = require("../middleware/user.middleware");

router.post("/", userMiddleware.isUserValid, userController.createUser);

router.get("/", userController.getAllUsers);

router.get("/:email", userController.getUserByEmail);

router.delete("/:userId", userMiddleware.checkIsIdValid, userController.deleteUser);

module.exports = router;
const router = require("express").Router();
const userController = require("../controllers/userController");
const { isUserConnected } = require("../middlewares/isUserConnected");

router.post("/signup", userController.createUser);

router.post("/login", userController.handleUserAuthentication);

router.delete("/", isUserConnected, userController.deleteUser);

module.exports = router;

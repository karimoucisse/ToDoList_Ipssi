const router = require("express").Router();
const { isUserAnAdmin } = require("../middlewares/isUserAnAdmin");
const { isUserConnected } = require("../middlewares/isUserConnected");
const listController = require("../controllers/listController");

// admin only
// Get all Lists
router.get("/", isUserConnected, isUserAnAdmin, listController.getAllUsersLists);

// get current user lists
router.get("/user", isUserConnected, listController.getUserLists);

// get one list by id
router.get("/:listId", isUserConnected, listController.getOneList);

router.post("/", isUserConnected, listController.createList);

router.put("/:listId", isUserConnected, listController.updateList);

router.delete("/:listId", isUserConnected, listController.deleteList);

module.exports = router;

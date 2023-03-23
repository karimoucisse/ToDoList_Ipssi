const router = require("express").Router();
const { isUserAnAdmin } = require("../middlewares/isUserAnAdmin");
const { isUserConnected } = require("../middlewares/isUserConnected");
const todoController = require("../controllers/todoController");

// admin only
// get all todos
router.get("/", isUserConnected, isUserAnAdmin, todoController.getAllUsersTodos);

// get current user todos
router.get("/list/:listId", isUserConnected, todoController.getUserTodos);

// get todo by id
router.get("/:todoId", isUserConnected, todoController.getOneTodo);

router.post("/:listId", isUserConnected, todoController.createTodo);

router.put("/:todoId", isUserConnected, todoController.updateTodo);

router.delete("/:todoId", isUserConnected, todoController.deleteTodo);

module.exports = router;

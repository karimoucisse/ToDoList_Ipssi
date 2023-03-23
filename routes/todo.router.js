const router = require("express").Router();
const { isUserAnAdmin } = require("../middlewares/isUserAnAdmin");
const { isUserConnected } = require("../middlewares/isUserConnected");
const todoController = require("../controllers/todoController")
const Todo = require("../modeles/Todo.Schema");

const Schema = Todo;

// admin only
router.get("/", isUserConnected, isUserAnAdmin, todoController.getAllUsersTodos);

router.get("/:todoId", isUserConnected, todoController.getOneTodo);

router.post("/:listId", isUserConnected, todoController.createTodo);

router.put("/:todoId", isUserConnected, todoController.modifyTodo);

router.delete("/:todoId", isUserConnected, todoController.deleteTodo);

module.exports = router;

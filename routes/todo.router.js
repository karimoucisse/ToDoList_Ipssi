const router = require("express").Router();
const { isUserAnAdmin } = require("../middlewares/isUserAnAdmin");
const { isUserConnected } = require("../middlewares/isUserConnected");
const Todo = require("../modeles/Todo.Schema");

const Schema = Todo;

// admin only
router.get("/", isUserConnected, isUserAnAdmin, async (req, res, next) => {
    try {
        const Todos = await Schema.find();
        res.status(200).json(Todos);
    } catch (error) {
        next(error);
    }
});

router.get("/:todoId", isUserConnected, async (req, res, next) => {
    try {
        const { todoId } = req.params;
        const todo = await Schema.findById(todoId);
        res.status(200).json(todo);
    } catch (error) {
        next(error);
    }
});

router.post("/:listId", isUserConnected, async (req, res, next) => {
    try {
        let todo = req.body;
        const { listId } = req.params;
        todo = { listId , ...todo };
        const response = Schema.create(todo);
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
});

router.put("/:todoId", isUserConnected, async (req, res, next) => {
    try {
        const { todoId } = req.params;
        const dataToModified = req.body;
        const modifiedTodo = await Schema.findByIdAndUpdate(todoId, dataToModified, { new: true });
        res.status(200).json({ message: "list modified !", modifiedTodo });
    } catch (error) {
        next(error);
    }
});

router.delete("/:todoId", isUserConnected, async (req, res, next) => {
    try {
        const { todoId } = req.params;
        await Schema.findByIdAndDelete(todoId);
        res.status(200).json({ message: "list deleted" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;

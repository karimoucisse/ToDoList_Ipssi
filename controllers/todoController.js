const router = require("express").Router();
const Todo = require("../modeles/Todo.Schema");

// admin only
exports.getAllUsersTodos = async (req, res, next) => {
    try {
        const Todos = await Todo.find();
        res.status(200).json(Todos);
    } catch (error) {
        next(error);
    }
};

exports.getOneTodo = async (req, res, next) => {
    try {
        const { todoId } = req.params;
        const todo = await Todo.findById(todoId);
        res.status(200).json(todo);
    } catch (error) {
        next(error);
    }
};

exports.createTodo = async (req, res, next) => {
    try {
        let todo = req.body;
        const { listId } = req.params;
        todo = { listId, ...todo };
        const response = Todo.create(todo);
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
};

exports.modifyTodo = async (req, res, next) => {
    try {
        const { todoId } = req.params;
        const dataToModified = req.body;
        const modifiedTodo = await Todo.findByIdAndUpdate(todoId, dataToModified, { new: true });
        res.status(200).json({ message: "list modified !", modifiedTodo });
    } catch (error) {
        next(error);
    }
};

exports.deleteTodo = async (req, res, next) => {
    try {
        const { todoId } = req.params;
        await Todo.findByIdAndDelete(todoId);
        res.status(200).json({ message: "list deleted" });
    } catch (error) {
        next(error);
    }
};

module.exports = router;

const Todo = require("../modeles/Todo.Schema");
const { verifyFields } = require("../utils/data");

// admin only
exports.getAllUsersTodos = async (req, res, next) => {
    try {
        const Todos = await Todo.find();
        res.status(200).json(Todos);
    } catch (error) {
        next(error);
    }
};

exports.getUserTodos = async (req, res, next) => {
    try {
        const { listId } = req.params;
        const todos = await Todo.find({ listId });
        res.status(200).json(todos);
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
        const isFieldValid = verifyFields("todo", req.body)
        if(!isFieldValid){
            return res.status(422).json({ message: "need 2 key: status and description" });
        }
        let todo = req.body;
        const { listId } = req.params;
        todo = { listId, ...todo };
        const response = Todo.create(todo);
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
};

exports.updateTodo = async (req, res, next) => {
    try {
        const { todoId } = req.params;
        const isFieldValid = verifyFields("todo", req.body)
        if(!isFieldValid){
            return res.status(422).json({ message: "accepted key: status and description" });
        }
        const dataToModified = req.body;
        const modifiedTodo = await Todo.findByIdAndUpdate(todoId, dataToModified, { new: true });
        res.status(200).json({ message: "todo modified !", modifiedTodo });
    } catch (error) {
        next(error);
    }
};

exports.deleteTodo = async (req, res, next) => {
    try {
        const { todoId } = req.params;
        await Todo.findByIdAndDelete(todoId);
        res.status(200).json({ message: "todo deleted" });
    } catch (error) {
        next(error);
    }
};

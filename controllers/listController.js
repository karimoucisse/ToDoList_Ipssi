const List = require("../modeles/List.Schema");
const Todo = require("../modeles/Todo.Schema");
const { verifyFields } = require("../utils/data");

exports.getAllUsersLists = async (req, res, next) => {
    try {
        const lists = await List.find();
        res.status(200).json(lists);
    } catch (error) {
        next(error);
    }
};

exports.getUserLists = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const lists = await List.find({ userId });
        res.status(200).json(lists);
    } catch (error) {
        next(error);
    }
};

exports.getOneList = async (req, res, next) => {
    try {
        const { listId } = req.params;
        const list = await List.findById(listId);
        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
};

exports.createList = async (req, res, next) => {
    try {
        const isFieldValid = verifyFields("list", req.body)
        if(!isFieldValid){
            return res.status(422).json({ message: "only need 1 key: name" });
        }
        let list = req.body;
        const { userId } = req.user;
        list = { userId, ...list };
        const response = List.create(list);
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
};

exports.updateList = async (req, res, next) => {
    try {
        const { listId } = req.params;
        const isFieldValid = verifyFields("list", req.body)
        if(!isFieldValid){
            return res.status(422).json({ message: "only need 1 key: name" });
        }
        const dataToModified = req.body;
        const modifiedList = await List.findByIdAndUpdate(listId, dataToModified, { new: true });
        res.status(200).json({ message: "list modified !" });
    } catch (error) {
        next(error);
    }
};

exports.deleteList = async (req, res, next) => {
    try {
        const { listId } = req.params;
        await List.findByIdAndDelete(listId);
        await Todo.deleteMany({ listId });
        res.status(200).json({ message: "list deleted" });
    } catch (error) {
        next(error);
    }
};

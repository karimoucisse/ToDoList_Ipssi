const List = require("../modeles/List.Schema");

const Schema = List;

exports.getAllUsersLists = async (req, res, next) => {
    try {
        const lists = await Schema.find();
        res.status(200).json(lists);
    } catch (error) {
        next(error);
    }
};

exports.getUserLists = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const lists = await Schema.find({ userId });
        res.status(200).json(lists);
    } catch (error) {
        next(error);
    }
};

exports.getOneList = async (req, res, next) => {
    try {
        const { listId } = req.params;
        const list = await Schema.findById(listId);
        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
};

exports.createList = async (req, res, next) => {
    try {
        let list = req.body;
        const { userId } = req.user;
        list = { userId, ...list };
        const response = Schema.create(list);
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
};

exports.modifyList = async (req, res, next) => {
    try {
        const { listId } = req.params;
        const dataToModified = req.body;
        const modifiedList = await Schema.findByIdAndUpdate(listId, dataToModified, { new: true });
        res.status(200).json({ message: "list modified !" });
    } catch (error) {
        next(error);
    }
};

exports.deleteList = async (req, res, next) => {
    try {
        const { listId } = req.params;
        await Schema.findByIdAndDelete(listId);
        res.status(200).json({ message: "list deleted" });
    } catch (error) {
        next(error);
    }
};

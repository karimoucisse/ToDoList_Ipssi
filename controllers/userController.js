const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const List = require("../modeles/List.Schema");
const Todo = require("../modeles/Todo.Schema");
const User = require("../modeles/User.Schema");
const { verifyFields } = require("../utils/data");

exports.createUser = async (req, res, next) => {
    try {
        const isFieldValid = verifyFields("user", req.body);
        if (!isFieldValid) {
            return res.status(422).json({ message: "need 2 keys : email, password" });
        }
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(409).json({ message: "email already used" });
        }
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        await User.create({ email, password: hash });
        res.status(201).json({ message: "user created" });
    } catch (error) {
        next(error);
    }
};

exports.handleUserAuthentication = async (req, res, next) => {
    try {
        const isFieldValid = verifyFields("user", req.body);
        if (!isFieldValid) {
            return res.status(422).json({ message: "need 2 keys : email, password" });
        }
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res.status(409).json({ message: "wrong email or password" });
        }
        const isValid = await bcrypt.compare(password, foundUser.password);
        if (!isValid) {
            return res.status(409).json({ message: "wrong email or password" });
        }
        const dataToSend = {
            userId: foundUser._id.toString(),
            token: jwt.sign(
                {
                    userId: foundUser._id.toString(),
                    email: foundUser.email,
                    isAdmin: foundUser.isAdmin,
                },
                process.env.SECRET_TOKEN,
                {
                    expiresIn: "10h",
                }
            ),
        };
        res.status(200).json(dataToSend);
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.user;
        await User.findByIdAndDelete({ _id: userId });
        const lists = await List.find({ userId });
        lists.forEach(async (list) => await Todo.deleteMany({ listId: list._id }));
        await List.deleteMany({ userId });
        res.status(200).json({ message: "deleted user" });
    } catch (error) {
        next(error);
    }
};

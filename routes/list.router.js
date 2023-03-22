const router = require("express").Router();
const List = require("../modeles/List.Schema");

const Schema = List;

// admin only
router.get("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { listId } = req.params;
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const list = req.body;
    const response =  Schema.create(list);
    res.status(201).json(response)
  } catch (error) {
    next(error);
  }
});

// admin only
router.put("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { listId } = req.params;
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { listId } = req.params;
  } catch (error) {
    next(error);
  }
});

module.exports = router;

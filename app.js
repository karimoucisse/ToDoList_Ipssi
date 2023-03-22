require("dotenv").config();
const express = require("express");
const { connectToMongodb } = require("./config/database");
const authRouter = require("./routes/auth.router");
const listRouter = require("./routes/list.router");
const todoRouter = require("./routes/todo.router");

const app = express();
const PORT = process.env.PORT || 5000;
connectToMongodb();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/list", listRouter);
app.use("/todo", todoRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ status: 'error', message: err })
})
app.use((req, res) => {
  res.status(404).json({ message: 'not found, check url !' })
})

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

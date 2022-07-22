const express = require("express");
const mongoose = require(`mongoose`)
const db = mongoose.connect('mongodb://localhost/bookAPI');
const app = express();

const bookRouter = express.Router();

const port = 3000;

bookRouter.route("/books").get((req, res) => {
  const response = { hello: "Hiiiii" };
  res.json(response);
});

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my ");
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

const express = require(`express`);
const mongoose = require(`mongoose`);
const app = express();
const db = mongoose.connect("mongodb://localhost/rest_api_practice");
const port = process.env.PORT || 3000;
const Book = require("./models/bookModel.js");
const bodyParser = require("body-parser");

const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my API LOL");
});

app.listen(port, () => {
  console.log(`Running on port + ${port}`);
});

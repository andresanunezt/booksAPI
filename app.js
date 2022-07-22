const express = require(`express`);
const mongoose = require(`mongoose`);
const app = express();
const db = mongoose.connect("mongodb://localhost/rest_api_practice");
const bookRouter = express.Router();
const port = process.env.PORT || 3000;
const Book = require("./models/bookModel.js");

bookRouter.route("/books").get((req, res) => {
  Book.find((err, books) => {
    if (err) {
      return res.send(err);
    }
    return res.json(books);
  });
});

// bookRouter.route("/books").get((req, res) => {
//   const response = { hello: "Hiiiii" };
//   res.json(response);
// });
app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my API LOL");
});

app.listen(port, () => {
  console.log(`Running on port + ${port}`);
});

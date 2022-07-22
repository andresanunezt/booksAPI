const express = require(`express`);
const mongoose = require(`mongoose`);
const app = express();
const db = mongoose.connect("mongodb://localhost/rest_api_practice");
const bookRouter = express.Router();
const port = process.env.PORT || 3000;
const Book = require("./models/bookModel.js");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

bookRouter
  .route("/books")
  .post((req, res) => {
    const book = new Book(req.body);

    book.save();
    return res.status(201).json(book);
  })
  .get((req, res) => {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  });

bookRouter.use("/books/:bookId", (req, res, next) => {
  Book.findById(req.params.bookId, (err, book) => {
    if (err) {
      return res.send(err);
    }
    if (book) {
      req.book = book;
      return next();
    }
    return res.sendStatus(404);
  });
});

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my API LOL");
});

app.listen(port, () => {
  console.log(`Running on port + ${port}`);
});

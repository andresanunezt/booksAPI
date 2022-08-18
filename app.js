const express = require(`express`);
const mongoose = require(`mongoose`);
const app = express();
const db = mongoose.connect("mongodb://localhost/rest_api_practice");
const port = process.env.PORT || 3000;
const Book = require("./models/bookModel.js");
const User = require("./models/userModel.js");
const bodyParser = require("body-parser");

// const bookRouter = require("./routes/bookRouter")(Book);
const userRouter = require("./routes/userRouter")(User);
const signupRouter = require('./routes/signupRouter')(User);
const loginRouter = require("./routes/loginRouter")(User,Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use("/api", bookRouter);
app.use("/api", userRouter);
app.use('/api', signupRouter);
app.use("/api", loginRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my API LOL");
});

app.listen(port, () => {
  console.log(`Running on port + ${port}`);
});

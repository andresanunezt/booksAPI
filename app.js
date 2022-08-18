const express = require(`express`);
const mongoose = require(`mongoose`);
const app = express();
const {expressjwt: jwt }= require('express-jwt');
var jwks = require('jwks-rsa');
const db = mongoose.connect("mongodb://localhost/rest_api_practice");
const port = process.env.PORT || 3000;
const Book = require("./models/bookModel.js");
const User = require("./models/userModel.js");
const bodyParser = require("body-parser");

const userRouter = require("./routes/userRouter")(User);
const signupRouter = require('./routes/signupRouter')(User);
const loginRouter = require("./routes/loginRouter")(User,Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use("/api", bookRouter);
app.use("/api", userRouter);
app.use('/api', signupRouter);
app.use("/api", loginRouter);

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-ps5yo02j.us.auth0.com/.well-known/jwks.json'
}),
audience: 'http://localhost:3000/',
issuer: 'https://dev-ps5yo02j.us.auth0.com/',
algorithms: ['RS256']
});

app.use(jwtCheck);

app.get("/", (req, res) => {
  res.send("Welcome to my API LOL");
});

app.listen(port, () => {
  console.log(`Running on port + ${port}`);
});

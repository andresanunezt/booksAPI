const express = require("express");

bcrypt = require("bcrypt");

function routes(User) {
  const userRouter = express.Router();

  saltRounds = 10;

  userRouter
    .route("/users")
    .post((req, res) => {
      const name = req.body.name;
      const password = req.body.password;
      bcrypt.hash(password, saltRounds, async function (err, hash) {
        const newUser = await User.create({ name: name, password: hash });
        return res.json({newUser});
      });
    })
    .get((req, res) => {
      const query = {};
      if (req.query.name) {
        query.name = req.query.name;
      }

      User.find(query, (err, users) => {
        if (err) {
          return res.send(err);
        }
        return res.json(users);
      });
    });

  // Middleware
  userRouter.use("/users/:userId", (req, res, next) => {
    User.findById(req.params.userId, (err, user) => {
      if (err) {
        return res.send(err);
      }
      if (user) {
        req.user = user;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  userRouter
    .route("/users/:userId")
    .get((req, res) => {
      res.json(req.user);
    })
    .put((req, res) => {
      const { user } = req;

      user.name = req.body.name;
      user.password = req.body.password;

      req.user.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(user);
      });
    })
    .patch((req, res) => {
      const { user } = req;

      if (req.body._id) {
        delete req.body._id;
      }

      Object.entries(req.body).forEach((prop) => {
        const key = prop[0];
        const value = prop[1];
        user[key] = value;
      });

      req.user.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(user);
      });
    })
    .delete((req, res) => {
      req.user.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });

  return userRouter;
}

module.exports = routes;

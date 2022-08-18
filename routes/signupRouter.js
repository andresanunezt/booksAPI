const express = require('express');
const path = require('path');

const bcrypt = require("bcrypt");
const saltRounds = 10;

function routes(User){
    const signupRouter = express.Router();


    signupRouter.route('/signup')
    .post((req, res) => {
        const name = req.body.name;
        const password = req.body.password;
        bcrypt.hash(password, saltRounds, (err, hash) => {
            Object.keys(req.body).forEach((key) => {
                if(key === "password") {
                    req.body.password = hash;
                }
            })
            const newUser = new User(req.body);
            newUser.save((err) => {
                if(err){
                    return res.send(err)
                }
                return res.json(newUser);
            });
        })
    }) 

    return signupRouter;
}

module.exports = routes;
const express = require('express');

const basicAuth = require('express-basic-auth')
const bcrypt = require("bcrypt");

function routes(User,Book){
    const loginRouter = express.Router();

    // configure basic auth
    loginRouter.use(
        basicAuth({
        authorizer: dbAuthorizer,
        authorizeAsync: true,
        unauthorizedResponse: () => "You don't have any access."
        })
    )

    // compare username and password with the db content
    // return boolean indicating password match
    async function dbAuthorizer(username, password, callback){
        try{
            // get matching user from db
            const user = await User.find({name : username})

            // if username is valid compare passwords
            let isValid = (user != null) ? await bcrypt.compare(password, user[0].password) : false;
            callback(null, isValid)

        }catch(err){
            // if authorizer fails, show error
            console.log("Error: ",err)
            callback(null, false)
        }
    }

    // access all items
    loginRouter.route('/books')
    .get((req, res) => {
        // console.log( Item.find())
         Book.find((err, books) => {
            if(err){
                return res.send(err);
            }
            return res.json(books);
        });
    });

    return loginRouter;
}

module.exports = routes;
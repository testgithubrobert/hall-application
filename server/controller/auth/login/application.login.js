const express = require('express');
const router = express.Router();
const path = require('node:path');
const pool_connection = require('../../../model/connection/model.connection');
const bcrypt = require('bcrypt');

// login
router.route('/')
    .get((request, response) => {
        response.contentType = 'text/html';
            response.statusCode = 200;

            request ? global.setTimeout(() => response.sendFile(path.join(__dirname, '../../../../client/view/login.page.html',)), 1000) : (async function(){ return }());
    }).post(async (request, response) => {
        const availableAcounts = await pool_connection.query("SELECT * FROM accounts");
        const availableUsers = await pool_connection.query("SELECT * FROM users");

        const foundAccount = availableAcounts[0].find((account) => {
            return account.email === request.body.email;
        });
        const foundUser = availableUsers[0].find((user) => {
            return user.email === request.body.email;
        });

        const passwordMatch = await bcrypt.compare(request.body.password, foundAccount.password);
        // console.log(foundUser)
        try {
            if(!passwordMatch) {
                response.sendStatus(403); 
                return;
            } else {
                response.cookie("loggedInUser", foundUser.email, { maxAge: 1800000, httpOnly: false })
                response.redirect('http://127.0.0.1:3000/application.com/profile');
            }
        } catch (error) {
            console.log(error)
        }
    })

// 404
const controller = require('../../errors/404.controller');
router.use(controller.NotFound)
module.exports = router;
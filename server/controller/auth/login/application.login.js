const express = require('express');
const router = express.Router();
const path = require('node:path');
const pool_connection = require('../../../model/connection/model.connection');
const bcrypt = require('bcrypt');
const authorization = require('../../jwt/token.verify');
const jwt = require('jsonwebtoken');
const configuration = require('../../../model/config/configuration.json');

// login
router.route('/')
    .get((request, response) => {
        response.contentType = 'text/html';
            response.statusCode = 200;

            request ? global.setTimeout(() => response.sendFile(path.join(__dirname, '../../../../client/view/login.page.html',)), 1000) : (async function(){ return }());
    }).post(async (request, response) => {
        const token = jwt.sign(request.body, configuration.tokens.secrete_key, { expiresIn: '1d' });
        const registeredAccounts = await pool_connection.query("SELECT * FROM accounts");
        const registeredUsers = await pool_connection.query("SELECT * FROM users");

        const foundAccount = registeredAccounts[0].find((account) => { return account.email === request.body.email });
        const foundUser = registeredUsers[0].find((user) => { return user.email === request.body.email });

        try {
        const passwordMatch = await bcrypt.compare(request.body.password, foundAccount.password);

            if(!passwordMatch) {
                response.sendStatus(400); 
                return;
            }else if(!foundAccount || !foundUser) {
                response.sendStatus(404); 
                return;
            }else {
                response.cookie("loggedInUser", foundUser.email, { maxAge: 1800000, httpOnly: false })
                response.redirect('http://127.0.0.1:3000/application.com/profile');
            }
        } catch (error) {
            console.log(error);
            response.sendStatus(404); 
                return;
        }
    })

// 404
const controller = require('../../errors/404.controller');
router.use(controller.NotFound)
module.exports = router;
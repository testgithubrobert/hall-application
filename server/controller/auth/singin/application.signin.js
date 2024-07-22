const express = require('express');
const router = express.Router();
const path = require('node:path');
const pool_connection = require('../../../model/connection/model.connection');
const { v4:uuid } = require('uuid');

let format = require('date-fns').format;
const date = JSON.stringify(format(new Date(), "dd/MM/yyyy\tHH:mm:ss"));
const bcrypt = require('bcrypt');

// sign in or register a new account
router.route('/') 
    .get((request, response) => {
        response.contentType = 'text/html';
            response.statusCode = 200;
        
            request ? global.setTimeout(() => response.sendFile(path.join(__dirname, '../../../../client/view/apply.page.html',)), 1000) : (async function(){ return }());
    }).post(async (request, response) => {
        response.contentType = 'text/html';
            response.statusCode = 201;

        // hash user accounts password before registering the account to the api database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(`${request.body.password}`, salt);

        try {
            if(request.body.password.length < 8 || request.body.first_name.length < 3 || request.body.last_name.length < 3) {
                response.sendStatus(400);
            } else {
                // insert and save new account data to the database 
                await pool_connection.query(`INSERT INTO accounts VALUES( ${JSON.stringify(uuid())}, ${JSON.stringify(request.body.first_name)}, ${JSON.stringify(request.body.last_name)}, ${JSON.stringify(request.body.email)}, ${2}, ${5}, ${date}, ${JSON.stringify(hashedPassword)} )`);
 
                // insert and save new account data to the database to show accounts history
                await pool_connection.query(`INSERT INTO accounts_history VALUES( ${JSON.stringify(uuid())}, ${JSON.stringify(request.body.first_name)}, ${JSON.stringify(request.body.last_name)}, ${JSON.stringify(request.body.email)}, ${2}, ${5}, ${date}, ${JSON.stringify(hashedPassword)} )`);

                // create new user
                await pool_connection.query(`INSERT INTO users VALUES( ${JSON.stringify(uuid())}, ${JSON.stringify(request.body.first_name)}, ${JSON.stringify(request.body.last_name)}, ${JSON.stringify(request.body.email)}, ${2}, ${5}, ${date})`);

                // create new user history
                await pool_connection.query(`INSERT INTO users_history VALUES( ${JSON.stringify(uuid())}, ${JSON.stringify(request.body.first_name)}, ${JSON.stringify(request.body.last_name)}, ${JSON.stringify(request.body.email)}, ${2}, ${5}, ${date})`);

                response.status(201).send('You can now log into your account <a href="http://127.0.0.1:3000/application.com/login?query=login">Log in</a>')
            }

        } catch (error) {
            response.sendStatus(400);
            console.log(error.message);
        }
    });

// 404
const controller = require('../../errors/404.controller');
router.use(controller.NotFound);
module.exports = router; 
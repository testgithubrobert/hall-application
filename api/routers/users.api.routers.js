const express = require('express');
const router = express.Router();
const path = require('node:path');
const pool_connection = require('../../server/model/connection/model.connection');

router.route('/')
    .get(async (request, response) => {
        response.contentType = 'text/html';
            response.statusCode = 200;
            const usersData = await pool_connection.query("SELECT * FROM users");
            request ? global.setTimeout(() => response.json(usersData[0]), 1000) : (async function(){ return }());
    })
    .put(async (request, response) => {
        response.contentType = 'text/html';
            response.statusCode = 200;
            await pool_connection.query(`UPDATE users SET friends = ${request.body.friends}, points = ${request.body.points} WHERE first_name = ${JSON.stringify(request.body.first_name)} OR last_name = ${JSON.stringify(request.body.last_name)}`);
            await pool_connection.query(`UPDATE users_history SET friends = ${request.body.friends}, points = ${request.body.points} WHERE first_name = ${JSON.stringify(request.body.first_name)} OR last_name = ${JSON.stringify(request.body.last_name)}`);
            request ? global.setTimeout(() => response.json('update done'), 1000) : (async function(){ return }());
    });

module.exports = router;
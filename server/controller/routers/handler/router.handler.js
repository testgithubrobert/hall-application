const express = require('express');
const router = express.Router();
const path = require('node:path');
var { v4:uuid } = require('uuid');
const pool_connection = require('../../../model/connection/model.connection');

// handle post created on db
let format = require('date-fns').format;
const date = JSON.stringify(format(new Date(), "dd/MM/yyyy\tHH:mm:ss"));

router.route('/')
    .get((request, response) => {
        response.contentType = 'text/html';
            response.statusCode = 200;

            request ? global.setTimeout(() => response.sendFile(path.join(__dirname, '../../../../client/view/posts.page.html',)), 1000) : (async function(){ return }());
    })
    .post(async (request, response) => {
        response.contentType = 'text/html';
            response.statusCode = 201;

            // create new post
            await pool_connection.query(`INSERT INTO posts VALUES( ${JSON.stringify(uuid())}, ${JSON.stringify(request.body.postedUser)}, ${date}, ${JSON.stringify(request.body.title.toLocaleUpperCase())}, ${JSON.stringify(request.body.content)}, ${0})`);

            // create posts history for those posted
            await pool_connection.query(`INSERT INTO posts_history VALUES( ${JSON.stringify(uuid())}, ${JSON.stringify(request.body.postedUser)}, ${date}, ${JSON.stringify(request.body.title.toLocaleUpperCase())}, ${JSON.stringify(request.body.content)}, ${0})`);
            request ? global.setTimeout(() => response.redirect('/application.com/posts/'), 1000) : (async function(){ return }());
    })
    .put(async (request, response) => {
        response.contentType = 'text/html';
            response.statusCode = 201;

            await pool_connection.query(`UPDATE posts SET comments = ${JSON.stringify(request.body.comment)} WHERE title = ${JSON.stringify(request.body.title)}`);
    });

module.exports = router;
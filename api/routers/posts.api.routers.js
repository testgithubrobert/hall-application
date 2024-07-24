const express = require('express');
const router = express.Router();
const path = require('node:path');
const pool_connection = require('../../server/model/connection/model.connection');
const authorization = require('../../server/controller/jwt/token.verify');

router.route('/')
    .get(async (request, response) => {
        response.contentType = 'text/html';
            response.statusCode = 200;

            const posts = await pool_connection.query("SELECT * FROM posts");
            request ? global.setTimeout(() => response.json(posts[0]), 1000) : (async function(){ return }());
    })
    .put(async (request, response) => {
        response.contentType = 'text/html';
            response.statusCode = 200;
            await pool_connection.query(`UPDATE posts SET likes = ${request.body.likes} WHERE title = ${JSON.stringify(request.body.title)}`);
            await pool_connection.query(`UPDATE posts_history SET likes = ${request.body.likes} WHERE title = ${JSON.stringify(request.body.title)}`);
            request ? global.setTimeout(() => response.json('update done'), 1000) : (async function(){ return }());
    });

module.exports = router;
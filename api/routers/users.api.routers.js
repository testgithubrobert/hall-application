const express = require('express');
const router = express.Router();
const path = require('node:path');
const pool_connection = require('../../server/model/connection/model.connection');

router.get('/', async (request, response) => {
    response.contentType = 'text/html';
        response.statusCode = 200;

        const usersData = await pool_connection.query("SELECT * FROM users");

        request ? global.setTimeout(() => response.json(usersData[0]), 1000) : (async function(){ return }());
});

module.exports = router;
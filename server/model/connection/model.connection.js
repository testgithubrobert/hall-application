"use strict";
const mysql = require('mysql');
const mysql2 = require('mysql2');
require('dotenv').config();
require('dotenv').configDotenv();
const configuration = require('../config/configuration.json');
const pool_connection = mysql2.createPool({
    user: "root",
    database: "sample_api",
    password: process.env.connection_password || configuration.database.password,
    host: process.env.host,
}).promise();
module.exports = pool_connection;

"use strict";
const mysql: any = require('mysql');
const mysql2: any = require('mysql2');
require('dotenv').config();
require('dotenv').configDotenv();
const configuration = require('../config/configuration.json')

// pool connection to DBMS
type Pool_Connection = { user: string, database: string, password: string, host: string }
const pool_connection: Required<Readonly<Pool_Connection>> = mysql2.createPool({
    user: "root",
    database: "sample_api",
    password: process.env.connection_password || configuration.database.password,
    host: process.env.host,
}).promise();

module.exports = pool_connection;
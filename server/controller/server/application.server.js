"use strict";
const express = require('express');
const application = express();
const http = require('node:http');
const server = http.createServer(application);
require('dotenv').config();
require('dotenv').configDotenv();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
let path = require('node:path');
const cors = require('cors');
// middleware
const logsMiddleware = require('../middleware/middleware');
application.use(logsMiddleware.logs);
application.use(cookieParser());
application.use(bodyParser.json());
application.use(express.json());
application.use(express.urlencoded({ extended: false }));
application.use(bodyParser.urlencoded({ extended: false }));
application.use(express.static(path.join(__dirname, '..', 'view', 'frontend')));
application.use(cors());
// server
server.listen(process.env.port, process.env.host, () => {
    console.log('server running!');
});

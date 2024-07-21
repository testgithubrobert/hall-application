"use strict";
const express = require('express');
const application = express();
const http = require('node:http');
const server = http.createServer(application);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
let path = require('node:path');
const cors = require('cors');

require('dotenv').config();
require('dotenv').configDotenv();

// middleware
const middleware = require('../middleware/middleware');
application.use(middleware.logs);
application.use(cookieParser());
application.use(bodyParser.json());
application.use(express.json());
application.use(express.urlencoded({ extended: false }));
application.use(bodyParser.urlencoded({ extended: false }));
application.use(express.static(path.join(__dirname, '../../../client/public')));
application.use(express.static(path.join(__dirname, '../../../client/public/img')));
application.use(cors());

// routers
application.use('/application.com', require('../routers/application.routers'));

// 404
const controller = require('../errors/404.controller');
application.use(controller.NotFound);
// server
const configuration = require('../../model/config/configuration.json');
server.listen(process.env.port || configuration.server.port, process.env.host || configuration.server.IpAddress, () => {
    console.log('server running!');
});

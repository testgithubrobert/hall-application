const express = require('express');
const router = express.Router();
const path = require('node:path');

router.get('/posts', (request, response) => {
    response.contentType = 'text/html';
        response.statusCode = 200;

        request ? global.setTimeout(() => response.sendFile(path.join(__dirname, '../../../client/view/posts.page.html',)), 1000) : (async function(){ return }());
});

router.get('/', (request, response) => {
    response.contentType = 'text/html';
        response.statusCode = 200;

        request ? global.setTimeout(() => response.sendFile(path.join(__dirname, '../../../client/view/posts.page.html',)), 1000) : (async function(){ return }());
});

// people
router.get('/people', (request, response) => {
    response.contentType = 'text/html';
        response.statusCode = 200;
        
        request ? global.setTimeout(() => response.sendFile(path.join(__dirname, '../../../client/view/people.page.html',)), 1000) : (async function(){ return }());
});

// about
router.get('/about', (request, response) => {
    response.contentType = 'text/html';
        response.statusCode = 200;
    
        request ? global.setTimeout(() => response.sendFile(path.join(__dirname, '../../../client/view/about.page.html',)), 1000) : (async function(){ return }());
});

// sign into a new account or register
router.use('/signin', require('../auth/singin/application.signin'));

// login
router.use('/login', require('../auth/login/application.login'));

// api data
router.use('/api/registered-users/data', require('../../../api/routers/users.api.routers'));

// profile
router.get('/profile', (request, response) => {
    response.contentType = 'text/html';
        response.statusCode = 200;

        request ? global.setTimeout(() => response.sendFile(path.join(__dirname, '../../../client/view/profile.page.html',)), 1000) : (async function(){ return }());
});

// 404
const controller = require('../errors/404.controller');
router.use(controller.NotFound)
module.exports = router;


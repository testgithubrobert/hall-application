const express = require('express');
const router = express.Router();
const path = require('node:path');

// people
router.get('/people', (request, response) => {
    global.setTimeout(() => response.sendFile(path.join(__dirname, '../../../client/view/people.page.html',)), 1000)
});

// about
router.get('/about', (request, response) => {
    global.setTimeout(() => response.sendFile(path.join(__dirname, '../../../client/view/about.page.html',)), 1000)
});

// sign in
router.get('/signin', (request, response) => {
    global.setTimeout(() => response.sendFile(path.join(__dirname, '../../../client/view/apply.page.html',)), 1000)
});

// login
router.get('/login', (request, response) => {
    global.setTimeout(() => response.sendFile(path.join(__dirname, '../../../client/view/login.page.html',)), 1000)
});

// profile
router.get('/profile', (request, response) => {
    global.setTimeout(() => response.sendFile(path.join(__dirname, '../../../client/view/profile.page.html',)), 1000)
});

module.exports = router;
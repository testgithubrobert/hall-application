"use strict";
const jwt: any = require('jsonwebtoken');

async function authorization(request: any, response: any, next: any): Promise<any> {
    try {
        const authorizationHeaders: string = request.headers['authorization'];
        var token: string | any = authorizationHeaders.split('')[1];

        if(!token) {
            response.sendStatus(403);
            return;
        }
        else {
            jwt.verify(token, 'secrete-key', (err: any, user: any) => {
                request.user = user;
                next();
            });
        }
    } catch (error) {
        response.sendStatus(403);
        console.log(error)
    }
}

module.exports = authorization;
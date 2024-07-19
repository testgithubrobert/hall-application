"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.sign in(thisArg, _arguments || [])).next());
    });
};
const jwt = require('jsonwebtoken');
function authorization(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authorizationHeaders = request.headers['authorization'];
            var token = authorizationHeaders.split('')[1];
            if (!token) {
                response.sendStatus(403);
                return;
            }
            else {
                jwt.verify(token, 'secrete-key', (err, user) => {
                    request.user = user;
                    next();
                });
            }
        }
        catch (error) {
            response.sendStatus(403);
            console.log(error);
        }
    });
}
module.exports = authorization;

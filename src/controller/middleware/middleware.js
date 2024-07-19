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
// create middleware obj for storing all middleware ie logs middleware
var { v4: uuid } = require('uuid');
const path = require('node:path');
const fs = require('node:fs');
const fsp = require('node:fs').promises;
const format = require('date-fns').format;
const middleware = {
    logs: function (request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            response.statusCode = 200;
            const logs = `${uuid()}\t${request.headers.host}${request.path}\tmethod=${request.method}\t${format(new Date(), "dd/MM/yyyy\tHH:mm:ss")}\n`;
            try {
                if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
                    fsp.mkdir(path.join(__dirname, '..', '..', 'logs'));
                    return;
                }
                ;
                fsp.appendFile(path.join(__dirname, '..', '..', 'logs', 'logs.txt'), logs);
                next();
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
module.exports = middleware;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const path = require('node:path')
let controller = {
    NotFound: function (request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            response.statusCode = 404;
            response.contentType = ['text/plain', 'application/json', 'text/html'];
            request ? global.setTimeout(() => __awaiter(this, void 0, void 0, function* () { return yield response.sendFile(path.join(__dirname, '../../../client/view/404.page.html')); }), 500) : (function () {
                return __awaiter(this, void 0, void 0, function* () { return; });
            }());
        });
    }
};
module.exports = controller;

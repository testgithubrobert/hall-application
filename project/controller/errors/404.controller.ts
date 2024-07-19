"use strict";
type Controller = { NotFound(request: any, response: any): void }

let controller: Controller = {
    NotFound: async function(request: any, response: any) {
        response.statusCode = 404;
        response.contentType = [ 'text/plain', 'application/json', 'text/html' ];
        request ? global.setTimeout(async () => await response.sendStatus(404), 500) : (async function(){ return }());
    }
}

module.exports = controller;
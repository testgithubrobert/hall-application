// create middleware obj for storing all middleware ie logs middleware
var { v4:uuid } = require('uuid');
const path: any = require('node:path');
const fs: any = require('node:fs');
const fsp: any = require('node:fs').promises;
const format: any = require('date-fns').format; 

interface Middleware { logs: any }
const middleware: Middleware = {
    logs: async function(request: any, response: any, next: any) {
        response.statusCode = 200;
        const logs = `${uuid()}\t${request.headers.host}${request.path}\tmethod=${request.method}\t${format(new Date(), "dd/MM/yyyy\tHH:mm:ss")}\n`;
        try {
            if(!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
                fsp.mkdir(path.join(__dirname, '..', '..', 'logs'));
                return;
            };

            fsp.appendFile(path.join(__dirname, '..', '..', 'logs', 'logs.txt'), logs);
            next()
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = middleware;
const app = require('../../app');
const Server = require('../../lib/Server');

const server = new Server(app, process.env.PORT || '3000');

server.start();

const app = require("../../app");
// const Server = require("../../lib/Server");
const { Server } = require("@blueheim/node-utils");

const server = new Server("express", app, process.env.PORT || "6000");

server.start();

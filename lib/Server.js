const http = require('http');

class Server {
  constructor(app, port) {
    this.app = app;
    this.app.set('port', this.constructor.normalizePort(port));
    this.handler = null;
  }

  start() {
    // PORT
    this.handler = http.createServer(this.app);
    this.handler.listen(this.app.get('port'), () => {
      console.log(`Listening on port ${this.port}...`);
    });
  }

  async close() {
    this.handler.close();
  }

  getHandler() {
    return this.handler;
  }

  static normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }
}

module.exports = Server;

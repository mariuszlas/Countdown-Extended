const httpServer = require('./server.js');
const port = process.env.PORT || 5001;

httpServer.listen(port, () => console.log('http server is running'));

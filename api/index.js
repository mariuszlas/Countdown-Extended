const httpServer = require('./server.js');
const port = process.env.PORT || 3000;

httpServer.listen(port, () => console.log(`http server is running on port ${port}`));

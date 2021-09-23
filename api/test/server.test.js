const Client = require("socket.io-client");

const { httpServer, io } = require('../server.js');


describe('asdf', () => {
    
    let clientSocket;

    beforeAll(done => {
        httpServer.listen(() => {
            const port = httpServer.address().port;
            clientSocket = new Client(`http://localhost:${port}`);
            clientSocket.on('connect', done);
        })
    })

    afterAll(done => {
        clientSocket.close();
        io.close();
        httpServer.close();
        done();
    })
    
    
    test('piuoj', done => {
        clientSocket.on('hello', arg => {
            expect(arg).toEqual('world');
            done();
        })

        io.emit('hello', 'world');
    })
})

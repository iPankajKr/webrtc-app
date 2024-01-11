const { ExpressPeerServer } = require('peer');

const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const peerServer = ExpressPeerServer(server, {
    debug: true,
});

app.use('/peerjs', peerServer);

server.listen(9000, () => {
    console.log('PeerJS server is running on port 9000')
});
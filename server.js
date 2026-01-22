const http = require('http');
const fs = require('fs');
const path = require('path');
const { Server } = require('socket.io');

const server = http.createServer((req, res) => {
let filePath = req.url === '/' ? './index.html' : '.' + req.url;
    const extname = path.extname(filePath);
    
    let contentType = 'text/html';
    if (extname === '.css') contentType = 'text/css';
    if (extname === '.js') contentType = 'text/javascript';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(404);
            res.end('Arquivo nao encontrado');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Um usuário conectou: ' + socket.id);

    socket.on('chat-mensagem', (data) => {
        io.emit('chat-mensagem', {
            texto: data.texto,
            usuario: data.usuario,
            id: socket.id 
        });
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });
});

server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000.');
});
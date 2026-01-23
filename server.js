const http = require('http');
const fs = require('fs');
const path = require('path');
const { Server } = require('socket.io');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'chat_db', // Nome do banco no pgAdmin
  password: 'senha_do_pgAdmin', // Senha do seu pgAdmin
  port: 5432,
});

const iniciarBanco = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS mensagens (
        id SERIAL PRIMARY KEY,
        usuario VARCHAR(50) NOT NULL,
        texto TEXT NOT NULL,
        data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Banco PostgreSQL conectado");
  } catch (err) {
    console.error("Erro ao conectar ao banco:", err.message);
  }
};

iniciarBanco();

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

io.on('connection', async (socket) => {
    console.log('Um usuário conectou: ' + socket.id);

    try {
        const res = await pool.query('SELECT usuario, texto FROM mensagens ORDER BY data_envio ASC LIMIT 50');
        
        socket.emit('historico', res.rows);
    } catch (err) {
        console.error("Erro ao carregar histórico:", err);
    }

    socket.on('chat-mensagem', async (data) => {
    try {
        await pool.query(
            'INSERT INTO mensagens (usuario, texto) VALUES ($1, $2)',
            [data.usuario, data.texto]
        );

        io.emit('chat-mensagem', {
            texto: data.texto,
            usuario: data.usuario,
            id: socket.id
        });

    } catch (err) {
        console.error("Erro ao processar mensagem:", err);
    }
});

    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });
});

server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000.');
});
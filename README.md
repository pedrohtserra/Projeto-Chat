Chat em Node.js

Como rodar:
1. Clone o repositório
2. No terminal, use: `npm install`
3. Inicie o servidor: `node server.js`
4. Acesse: `http://localhost:3000`

Para o banco de dados (PostgreSQL):
1. Abra o pgAdmin e crie um banco de dados chamado `chat_db`
2. Certifique-se de que a senha que está no `server.js` coincide com a senha do seu PostgreSQL

Como utilizar o Bot Moderador:
1. Instale o Python
2. Instale a biblioteca do cliente Socket.io para Python: `pip install "python-socketio[client]"`
3. Com o servidor do chat já iniciado, em outro terminal, digite `python moderador.py`

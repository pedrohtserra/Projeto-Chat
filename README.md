Chat com Node.js e Angular

Como rodar:
1. Clone o repositório, `git clone https://github.com/seu-usuario/Projeto-Chat.git`
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

Para rodar com o Angular:
1. Caso ainda não tenha a ferramenta de linha de comando do Angular, instale-a globalmente com o comando: `npm install -g @angular/cli`
2. No terminal, dentro da pasta raiz do projeto Angular, instale os pacotes necessários (como o Socket.io-client): `npm install`
3. Com o servidor já iniciado (`node server.js` na pasta raiz), execute pelo terminal, dentro da pasta "chat-frontend" (`cd chat-frontend`), o comando `ng serve`

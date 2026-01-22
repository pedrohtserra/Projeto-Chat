var socket = io();
var form = document.getElementById('form');
var input = document.getElementById('input');
var messages = document.getElementById('messages');
var btnEntrar = document.getElementById('botao-login')
var inputNome = document.getElementById('nome-usuario')
var loginTela = document.getElementById('login-container')
var chatTela = document.getElementById('chat-container')
let nomeUsuario = "";

btnEntrar.addEventListener('click', () => {
    const nome = inputNome.value.trim();
    if (nome !== "") {
        nomeUsuario = nome;
        loginTela.style.display = 'none';
        chatTela.style.display = 'flex';
    }
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat-mensagem', {
            usuario: nomeUsuario,
            texto: input.value
        });

        input.value = '';
    }
});

socket.on('chat-mensagem', function(data) {
    const classe = (data.id === socket.id) ? 'minha-mensagem' : 'outra-mensagem';
    const mensagem = `${data.usuario}: ${data.texto}`;
    adicionarMensagem(mensagem, classe);
});

function adicionarMensagem(texto, classe) {
    var item = document.createElement('li');
    item.textContent = texto;
    item.classList.add(classe);
    messages.appendChild(item);

    messages.scrollTo({
        top: messages.scrollHeight,
        behavior: 'smooth'
    });
}

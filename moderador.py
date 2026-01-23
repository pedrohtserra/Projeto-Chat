import socketio

sio = socketio.Client()

palavras_banidas = ["palavrao", "bobao", "geregotango"]

@sio.event
def connect():
    print("Bot Moderador conectado ao servidor de chat")

@sio.on('chat-mensagem')
def on_message(data):
    usuario = data.get('usuario')
    texto = data.get('texto').lower()

    with open("historico_chat.txt", "a", encoding="utf-8") as f:
        f.write(f"[{usuario}]: {texto}\n")

    for palavra in palavras_banidas:
        if palavra in texto:
            print(f"Alerta: '{usuario}' digitou '{palavra}' (Palavra Proibida)")

try:
    sio.connect('http://localhost:3000')
    sio.wait()
except:
    print("Erro: O servidor Node.js está desligado?")
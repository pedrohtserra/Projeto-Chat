import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private socket: Socket;
  private url = 'http://localhost:3000';

  constructor() {
    this.socket = io(this.url);
  }

  sendMessage(usuario: string, texto: string) {
    this.socket.emit('chat-mensagem', { usuario, texto });
  }

  getMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('chat-mensagem', (data) => observer.next(data));
    });
  }

  getHistory(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('historico', (data) => observer.next(data));
    });
  }
}
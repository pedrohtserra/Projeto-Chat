import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Importe isso
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ChatService } from './chat'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  nomeUsuario = '';
  textoMensagem = '';
  mensagens: any[] = [];
  logado = false;

  constructor(private chatService: ChatService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.chatService.getHistory().subscribe((dados: any) => {
      this.mensagens = [...dados];
      this.cdr.detectChanges();
    });

    this.chatService.getMessage().subscribe((msg: any) => {
      console.log('Mensagem chegou:', msg);
      this.mensagens = [...this.mensagens, msg];
      this.cdr.detectChanges();
    });
  }

  entrar() {
    if (this.nomeUsuario.trim()) this.logado = true;
  }

  enviar() {
    if (this.textoMensagem.trim()) {
      this.chatService.sendMessage(this.nomeUsuario, this.textoMensagem);
      this.textoMensagem = '';
    }
  }
}
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket?: Socket;
  private socketURL = 'http://localhost:8080/';

  constructor() {
    this.connect();
  }

  private connect(): void {
    this.socket = io(this.socketURL);

    this.socket.on('connect', () => {
      console.log('Connected to the server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection Error:', error);
    });
  }

  sendMessage(msg: string): void {
    this.socket?.emit('message', msg);
  }

  getMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket?.on('newmessage', (message: any) => {
        observer.next(message);
      });
    });
  }
}

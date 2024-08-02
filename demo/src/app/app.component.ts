import { Component } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // socket: Socket;
  socketUrl = "localhost:8080";
  public socket1 = io('localhost:8080');
  // constructor() {
  //   // this.socket = io('http://localhost:8080');
  //   this.socket.on('connect', () => {
  //     console.log('Connected!');
  //   });
  // }

  // private socket = io('http://localhost:8080');

  // constructor() {
  //   this.socket.on('connect_error', (error: any) => {
  //     console.error('Socket.IO connection error:', error);
  //   });
  // }
}

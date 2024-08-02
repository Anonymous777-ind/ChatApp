import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { BackendApiService } from '../../services/backend-api.service';
import { SocketService } from '../../services/socket.service';
import { FormsModule } from '@angular/forms';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [UserCardComponent, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private socket?: Socket;
  private socketURL = 'http://localhost:8080/';

  allUserData: any[] = [];
  loginUser: any = {};
  isChatOpen: boolean = false;
  roomID: string = '';
  messageText: string = '';
  messageArray: any[] = [];
  selectedUser: any;

  constructor(private allData: BackendApiService) {}

  ngOnInit(): void {
    this.loginUser = this.allData.getUserData();

    this.allData.getAllUsers().subscribe({
      next: (data: any) => {
        if (data) {
          this.allUserData = data.data.filter(
            (user: any) => user.fullname !== this.loginUser.fullname
          );
        } else {
          console.log('No user data available or localStorage is undefined.');
        }
      },
      error: (error: any) => {
        console.log('Error fetching the data ', error.message);
      },
    });

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

  selectUser(data: any) {
    this.isChatOpen = true;
    this.selectedUser = data.fullname;
  }
}

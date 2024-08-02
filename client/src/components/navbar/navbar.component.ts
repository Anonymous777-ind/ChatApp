import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BackendApiService } from '../../services/backend-api.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  constructor(private auth: BackendApiService, private router: Router){}

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.isLogin = this.auth.isAuthenticated();
  }

  logout(){
    localStorage.removeItem('authToken');
    this.checkLoginStatus(); // Update the login status
    this.router.navigate(['login'])
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class BackendApiService {
  private BACKEND_API = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}

  loginUser(data: any): Observable<any> {
    return this.http.post(`${this.BACKEND_API}login`, data);
  }

  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.BACKEND_API}register`, data);
  }

  getAllUsers(): Observable<any> {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${token}`
        );
        return this.http.get(`${this.BACKEND_API}home`, { headers });
      } else {
        return of(null); // Return an empty Observable if token is not found
      }
    } else {
      return of(null); // Return an empty Observable if localStorage is undefined
    }
  }

  isAuthenticated() {
    try {
      if (typeof localStorage !== 'undefined') {
        const token = localStorage.getItem('authToken');
        if (!token) {
          return false;
        }
        const decodedToken = jwtDecode(token);
        console.log('Decoded token', decodedToken);
      }
      return true;
    } catch (error) {
      console.error('Error checking authentication status', error);
      return false;
    }
  }

  getUserData(){
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (!token) {
        return false;
      }
      const decodedToken = jwtDecode(token);
      return decodedToken;
    }else{
      return null;
    }
  }
}

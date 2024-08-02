import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BackendApiService } from '../../services/backend-api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  isFormInValid: boolean = false;
  constructor(
    private fb: FormBuilder,
    private loginApi: BackendApiService,
    private router: Router
  ) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isFormInValid = false;

      this.loginApi.loginUser(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.status) {
            console.log('Login successfull!', res);
            if(typeof localStorage !== 'undefined'){
              localStorage.setItem('authToken', res.token);
            }else{
              console.log('Local Storage not available')
              return;
            }
            this.loginForm.reset();
            this.router.navigate(['']);
          } else {
            console.log(res.message);
          }
        },
        error: (error) => {
          console.error('Login failed!', error);
        },
      });
    } else {
      this.isFormInValid = true;
      console.log('Invalid Form!');
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BackendApiService } from '../../services/backend-api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;
  isFormInValid: boolean = false;

  constructor(private fb: FormBuilder, private registerApi: BackendApiService, private router: Router){
    this.registerForm = fb.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  get f(){
    return this.registerForm.controls;
  }

  onSubmit(){
    if(this.registerForm.valid){
      this.registerApi.registerUser(this.registerForm.value).subscribe({
        next: (response) => {
          // Handle successful registration
          console.log('Registration successful!', response);
          this.registerForm.reset();
          this.router.navigate([''])
        },
        error: (error) => {
          // Handle registration error
          console.error('Registration failed!', error);
        }
      });
    }else{
      this.isFormInValid = true;
      console.log('Form invalid!')
    }
  }
}

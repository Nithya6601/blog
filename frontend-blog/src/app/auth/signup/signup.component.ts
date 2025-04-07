import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupData = {
    email: '',
    username: '',
    password: '',
    re_password: ''
  };

  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.signup(this.signupData).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => {
        console.error('SignUp Error:', err.error);
        this.errorMessage = JSON.stringify(err.error);
      }
    });
  }
}

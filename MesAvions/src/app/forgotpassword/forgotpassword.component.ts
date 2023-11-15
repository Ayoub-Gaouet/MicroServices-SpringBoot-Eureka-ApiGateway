import { Component } from '@angular/core';
import { AvionService } from '../services/avion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {
  email: string = '';
  err:number = 0;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private avionService: AvionService, private router: Router) {}

  sendVerificationCode() {
    this.isLoading = true;

    this.avionService.sendVerificationCodeToEmail(this.email).subscribe(
      (response) => {
        this.isLoading = false;

        if (!this.isValidEmail(this.email)) {
          this.errorMessage = 'Please enter a valid email address.';
          return;
        }

        // Handle the success scenario, e.g., show a success message or navigate to another page.
        this.router.navigate(['/checkresetcode', { email: this.email }]); // Pass 'email' as a route parameter
      },
      (error) => {
        this.isLoading = false; // Set the isLoading property to false after the API call completes

        // Handle the error scenario, e.g., show an error message.
        this.err = 1;

        console.error('Failed to send verification code: ', error);
      }
    );
  }

  isValidEmail(email: string): boolean {
    // Basic email format validation using regex
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
}

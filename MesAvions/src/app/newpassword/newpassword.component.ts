import { Component } from '@angular/core';
import { AvionService } from '../services/avion.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent {
  form: any = {
    password: null,
    confirmPassword: null,
  };
  email: string = '';
  successMessage: string = '';
  isNewPasswordFailed = false;
  errorMessage = '';
  constructor(private avionService: AvionService, private router: Router, private route: ActivatedRoute) {
    this.email = this.route.snapshot.paramMap.get('email')!;
  }
  confirmPassword!: string;

  resetPassword() {
    const { username, email, password, confirmPassword } = this.form;
    this.successMessage = '';
    this.errorMessage = '';
    if (password !== confirmPassword) {
      this.errorMessage = 'Password and Confirm Password do not match';
      this.isNewPasswordFailed = true;
      return;
    }
    this.avionService.resetPassword(this.email, password).subscribe(
      (response) => {
        this.successMessage = 'Password reset successful.';
        this.router.navigate(['/login']);
      },
      (err) => {
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
          this.isNewPasswordFailed = true;
        } else {
          this.isNewPasswordFailed = false;
          this.router.navigate(['/login']);
        }
        this.errorMessage = 'Password reset failed.';
      }
    );
  }
}

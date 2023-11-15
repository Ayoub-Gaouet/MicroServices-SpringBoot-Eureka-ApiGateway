import { Component, OnInit } from '@angular/core';
import { AvionService } from '../services/avion.service';
import { User } from '../model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css'],
})
export class AddUsersComponent implements OnInit {
  isLoading: boolean = false;

  form: any = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private avionService: AvionService, private router: Router) {}

  user: User = new User();
  confirmPassword!: string;

  ngOnInit(): void {}

  register() {
    this.isLoading = true;

    const { username, email, password, confirmPassword } = this.form;
    if (password !== confirmPassword) {
      this.errorMessage = 'Password and Confirm Password do not match';
      this.isSignUpFailed = true;
      return;
    }
    let user = {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    console.log(user);
    this.avionService.saveUser(user).subscribe({
      next: (data) => {
        this.isLoading = false;
        console.log(data);
        this.router.navigate(['/verificationcode', { username: user.username }]);
      },
      error: (err) => {

        if (err.error && err.error.message) {
          this.isLoading = false;

          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        } else {
          this.isLoading = false;

          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.router.navigate(['/login']);
        }
      },
    });
  }
}

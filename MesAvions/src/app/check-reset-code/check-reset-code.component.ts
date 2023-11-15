import { Component } from '@angular/core';
import {AvionService} from "../services/avion.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-check-reset-code',
  templateUrl: './check-reset-code.component.html',
  styleUrls: ['./check-reset-code.component.css']
})
export class CheckResetCodeComponent {
  email!: string;
  verificationCode: string = ''; // Add verificationCode property

  constructor(private avionService: AvionService, private router: Router,private  routea : ActivatedRoute) {
    this.email=this.routea.snapshot.paramMap.get('email')!;
  }

  checkResetCode() {
    this.avionService.checkResetCode(this.email, this.verificationCode).subscribe(
      (response) => {
        if (response) {
          this.router.navigate(['/newpassword', { email: this.email }]); // Create a new password reset page.
        } else {
          console.error('Reset failed');
        }
      },
      (error) => {
        console.error('Failed to check reset code: ', error);
      }
    );
  }
}

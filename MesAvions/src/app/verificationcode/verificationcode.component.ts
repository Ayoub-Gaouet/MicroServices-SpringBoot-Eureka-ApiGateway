import { Component } from '@angular/core';
import { AvionService } from '../services/avion.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-verificationcode',
  templateUrl: './verificationcode.component.html',
  styleUrls: ['./verificationcode.component.css']
})
export class VerificationcodeComponent {
  verificationCode!: string;
  username!: string;
  msg: string | null = null; // Initialize msg as null

  constructor(private avionService: AvionService, private routea: ActivatedRoute, private router: Router) {
    this.username = this.routea.snapshot.paramMap.get('username')!;
  }

  activateUser(username: string, verificationCode: string) {
    if (!verificationCode) {
      // Check if verificationCode is empty
      this.msg = 'Verification code is empty. Please enter a code.';
      return; // Stop the function execution
    }

    this.avionService.activateUser(username, verificationCode).subscribe(
      (user) => {
        console.log('User activated successfully:', user);
        if (user != null) {
          this.router.navigate(['/login']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Activation Error',
            text: 'User activation failed: Please chek you email to enter the correct verification code ',
          });        }
      },
      (error) => {
        console.error('User activation failed:', error);
        this.msg = 'An error occurred while activating the user.'; // Display error message
      }
    );
  }
}

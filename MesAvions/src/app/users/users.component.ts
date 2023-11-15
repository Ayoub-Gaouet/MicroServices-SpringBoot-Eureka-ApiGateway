import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { Role } from '../model/role.model';
import { AuthService } from '../services/auth.service';
import { AvionService } from '../services/avion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'] // Removed the trailing comma here
})
export class UsersComponent implements OnInit {
  users?: User[];
  roles?: Role[];
  showCustomNotification: boolean = false;
  customNotificationMessage: string = '';

  constructor(
    public authService: AuthService,
    private avionService: AvionService,
    private toastr: ToastrService
  ) {
    this.toastr.toastrConfig.positionClass = 'toast-top-right';
  }

  ngOnInit(): void {
    this.chargerUsers();
  }

  chargerUsers() {
    this.avionService.listeUser().subscribe((us) => {
      this.users = us;
    });
  }

  supprimerUser(u: User) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.avionService.supprimerUser(u.user_id!).subscribe(() => {
        console.log('User supprimé');
        this.showCustomNotification = true;
        this.customNotificationMessage = 'Utilisateur supprimé avec succès';
        this.chargerUsers();
      });
    }
  }

}

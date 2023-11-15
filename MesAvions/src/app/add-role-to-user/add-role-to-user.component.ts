import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AvionService} from "../services/avion.service";
import {User} from "../model/user.model";
import {Role} from "../model/role.model";

@Component({
  selector: 'app-add-role-to-user',
  templateUrl: './add-role-to-user.component.html',
  styleUrls: ['./add-role-to-user.component.css']
})
export class AddRoleToUserComponent {

    constructor(
      private avionService: AvionService,
      private activatedRoute: ActivatedRoute
    ) { }

  user!: User;
  users: User[] = [];
  role!: Role;
  roles: Role[] = [];
  roleId!: number;
  newRole!: Role;
  oldRole!: Role;

  ngOnInit(): void {
    this.loadUserAndRoles();
  }

  loadUserAndRoles() {
    this.avionService.listeUser().subscribe((users) => {
      this.users = users;
    });

    this.avionService
      .getUserById(this.activatedRoute.snapshot.params['id'])
      .subscribe((user) => {
        this.user = user;
      });

    this.avionService.getAllRoles().subscribe((roles) => {
      this.roles = roles;
    });
  }

  addRoleToUser() {
    this.avionService
      .addRoleToUser(this.user.user_id, this.newRole)
      .subscribe((data) => {
        console.log('Role added to user');
        this.user.roles.push(this.newRole); // Add the new role to the user's roles
      });
  }

  removeRoleFromUser(id: number) {
    console.log('ROLE ID: ' + id);
    this.avionService.getRoleById(id).subscribe((role) => {
      this.roleId = role.role_id;
      this.oldRole = role;
      console.log('OLD ROLE: ' + this.oldRole);
      this.avionService
        .removeRoleFromUser(this.user.user_id, this.oldRole)
        .subscribe((data) => {
          console.log('Role removed from user');
          // Remove the role from the user's roles array
          this.user.roles = this.user.roles.filter(
            (userRole) => userRole.role_id !== id
          );
        });
    });
  }

}

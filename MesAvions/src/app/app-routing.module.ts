import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAvionComponent } from './add-avion/add-avion.component';
import { AvionGuard } from './avion.guard';
import { AvionsComponent } from './avions/avions.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { RechercheParCompanyComponent } from './recherche-par-company/recherche-par-company.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { UpdateAvionComponent } from './update-avion/update-avion.component';
import {UsersComponent} from "./users/users.component";
import {AddUsersComponent} from "./add-users/add-users.component";
import {AddRoleToUserComponent} from "./add-role-to-user/add-role-to-user.component";
import {VerificationcodeComponent} from "./verificationcode/verificationcode.component";
import {ForgotpasswordComponent} from "./forgotpassword/forgotpassword.component";
import {CheckResetCodeComponent} from "./check-reset-code/check-reset-code.component";
import {NewpasswordComponent} from "./newpassword/newpassword.component";

const routes: Routes = [
  {path: "avions", component : AvionsComponent},
  {path: "add-avions", component : AddAvionComponent, canActivate:[AvionGuard]},
  {path: "", redirectTo: "avions", pathMatch: "full"},
  {path: "updateAvion/:id", component: UpdateAvionComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path: "rechercheParCompany", component : RechercheParCompanyComponent},
  {path: 'login', component: LoginComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},
  {path: "users",component:UsersComponent, canActivate:[AvionGuard]},
  {path:"addusers",component:AddUsersComponent},
  {path:"add-role-to-user/:id",component:AddRoleToUserComponent},
  {path: 'verificationcode', component: VerificationcodeComponent},
  {path:"forgotpassword",component:ForgotpasswordComponent},
  {path: "checkresetcode", component: CheckResetCodeComponent},
  {path: "newpassword", component: NewpasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

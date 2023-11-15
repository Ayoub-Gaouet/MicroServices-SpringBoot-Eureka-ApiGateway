import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MesAvions';
  constructor (public authService: AuthService, private Router: Router) {}
  ngOnInit() {
    this.authService.loadToken();
    if (this.authService.getToken()==null ||
      this.authService.isTokenExpired())
      this.Router.navigate(['/login']);
  }
  onLogout(){
    this.authService.onLogout();
  }
}

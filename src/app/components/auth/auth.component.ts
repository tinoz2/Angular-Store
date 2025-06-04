import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})

export class AuthComponent{

  private auth = inject(AuthService)

  login(): void {
    this.auth.loginWithRedirect()
  }

  logout(): void {
    this.auth.logout()
  }
}

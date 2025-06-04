import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{

  private auth = inject(AuthService)

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      console.log("User: ", user)
    })
  }
}
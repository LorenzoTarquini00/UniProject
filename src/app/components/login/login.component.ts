import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  loginGoogle(): void { //if called i use the googleAuthProvider to let the user login
    this.authService.login(new firebase.default.auth.GoogleAuthProvider());
  }
}

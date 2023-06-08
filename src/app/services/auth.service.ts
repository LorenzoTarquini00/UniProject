import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UserService } from './user.service';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private userService: UserService, private router: Router) { }

  async login(provider: any): Promise<void> {  //let the user login
    await this.afAuth.signInWithPopup(provider).then(  //the popup appears
      credential => {
        if (credential) {
          this.userService.updateUser(credential.user as any); //update the database with the credentials

          const returnUrl = localStorage.getItem('returnUrl'); //take the path where the user want to go
          this.router.navigateByUrl(returnUrl as any); //sent the user there
        }
      }
    );
  }



  logout(): void { //let the user sign out
    this.afAuth.signOut();
    localStorage.clear(); //clear the local storage
  }
}

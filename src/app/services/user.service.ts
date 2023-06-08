import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, of as observableOf, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';
import * as firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

  private usersPath = '/users'; //to know where the players are

  authState$: Observable<firebase.default.User | null> = this.afAuth.authState; //state of the authentication

  displayName$: Observable<string | null> = this.authState$.pipe( //where is stored the name of teh actual user 
    map(user => {
      return !user ? null : user.displayName;
    })
  );

  isAdmin$: Observable<boolean | null> = this.authState$.pipe( //where is stored the admin privilege
    switchMap(user => {
      return !user ? observableOf(false) : this.db.object<boolean>('/users/' + user.uid + '/isAdmin/').valueChanges();
    })
  );

  updateUser(user: firebase.default.User): void { //if called the credential are updated
    this.db.object<User>('/users/' + user.uid)
      .update(
        {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
        }
      );
  }

  getUser(uid: string): Observable<User | null> { //if called takes the user from the database
    return this.db.object<User>(`/users/${uid}`).valueChanges();
  }

  getPlayers(): Observable<User[]> { //if called returns a list of the players ordered by the highscores
    return this.db
      .list<User>(this.usersPath)
      .valueChanges()
      .pipe(
        map(users => users.filter(user => user.highScore !== undefined)),
        map(users => users.sort((a, b) => b.highScore - a.highScore))
      );
  }

  getHighScore(): Observable<number> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          const userId = user.uid;
          return this.db.object<number>(`/users/${userId}/highScore`).valueChanges(); //return the highscore value
        } else {
          return of(0); // return 0 if the user is not authenticated
        }
      }),
      //management of null in case of erro or user not authenticated
      switchMap(highScore => {
        if (highScore === null) {
          return of(0); //return 0 if highscore is null
        } else {
          return of(highScore); //return the highscore
        }
      })
    );
  }


  updateHighScore(score: number): void {  //if called update the highscore on the database
    this.afAuth.authState  //control the auth status of the user
      .pipe(
        first(),
        map((user) => {
          if (user) {
            return user.uid;
          }
          return null;
        })
      )
      .subscribe((userId) => {
        if (userId) {
          this.db.object(`/users/${userId}`).update({ highScore: score }); //update the highscore on the database with the actual score
        }

      });
  }



}

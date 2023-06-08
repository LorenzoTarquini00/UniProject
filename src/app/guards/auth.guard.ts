import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate( //ceck if the user is logged in
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.authState$.pipe(
      map(authState => {
        if (authState) { //if is logged can proceed
          return true;
        }
        //else
        localStorage.setItem('returnUrl', state.url); //i memorize where the user want to go
        this.router.navigate(['/login/'], { queryParams: { returnUrl: state.url } }); //then i send it to the login page
        return false;
      })
    );
  }

}

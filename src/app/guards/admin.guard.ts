import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.isAdmin$.pipe(  //ceck if isAdmin is true
      map(isAdmin => {
        if (isAdmin) { //if is true the user can procede
          return true;
        }
        //else
        this.router.navigate(['/no-access/']); //the user is redirected to the no-acces page
        return false;
      })
    );
  }

}

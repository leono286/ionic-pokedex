import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { map, first } from 'rxjs/operators';
import { State } from 'src/app/state';
import { Store, select } from '@ngrx/store';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { isNull } from 'util';
import { UserInfo } from '../models/user';
import { getLoggedInUser } from '../auth/login/state/login.selectors';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<State>,  private router: Router) { }

  getLoggedInUserFromStore(): Observable<UserInfo> {
    return this.store.pipe(
      select(getLoggedInUser),
      first(),
      catchError(() => {
        return of(null);
      })
    )
  }

  canActivate(): Observable<boolean | UrlTree>  {
    return this.getLoggedInUserFromStore().pipe(map(userInfo => {
      const canNavigate = !isNull(userInfo);
      if (!canNavigate) {
        return this.router.createUrlTree(['']);
      } else {
        return canNavigate;
      }
    }));
  }

}

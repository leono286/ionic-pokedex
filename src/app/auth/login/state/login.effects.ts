import { LoginService } from './../services/login.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as loginActions from './login.actions'
import { UserInfo, UserLoginInfo } from "./../../../models/user";
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class LoginEffects {

  constructor(
    private actions$: Actions,
    private loginService: LoginService
  ) { }

  @Effect()
  validateUser$: Observable<Action> = this.actions$.pipe(
    ofType(loginActions.LoginActionTypes.LoginUser),
    map((action: loginActions.LoginUser) => action.payload),
    mergeMap((userLoginInfo: UserLoginInfo) => this.loginService.validateUser(userLoginInfo).pipe(
      map((userInfo: UserInfo | null) => {
        if (userInfo) {
          return new loginActions.LoginUserSuccess(userInfo);
        } else {
          return new loginActions.LoginUserFailure(true);
        }
      }),
    )
    )
  );

  @Effect()
  registeUser$: Observable<Action> = this.actions$.pipe(
    ofType(loginActions.LoginActionTypes.RegisterUser),
    map((action: loginActions.RegisterUser) => action.payload),
    mergeMap((userInfo: UserInfo) => this.loginService.registerUser(userInfo).pipe(
      map((userLoginInfo: UserLoginInfo | null) => {
        if (userLoginInfo) {
          return new loginActions.RegisterUserSuccess(userLoginInfo);
        }
      }),
    )
    )
  );
}

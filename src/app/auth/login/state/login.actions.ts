import { UserInfo, UserLoginInfo } from './../../../models/user';
import { Action } from '@ngrx/store';

export enum LoginActionTypes {
  LoginUser = '[Pokemon] Login User Request',
  LoginUserSuccess = '[Pokemon] Login User Success',
  LoginUserFailure = '[Pokemon] Login User Failure',
  LogoutUser = '[Pokemon] Logout User',
  RegisterUser = '[Pokemon] Register User Request',
  RegisterUserSuccess = '[Pokemon] Register User Success',
}


export class LogoutUser implements Action {
  readonly type = LoginActionTypes.LogoutUser;
}

export class LoginUser implements Action {
  readonly type = LoginActionTypes.LoginUser;
  constructor( public payload: UserLoginInfo) {}
}

export class LoginUserSuccess implements Action {
  readonly type = LoginActionTypes.LoginUserSuccess;
  constructor( public payload: UserInfo) {}
}

export class LoginUserFailure implements Action {
  readonly type = LoginActionTypes.LoginUserFailure;
  constructor( public payload: boolean) {}
}

export class RegisterUser implements Action {
  readonly type = LoginActionTypes.RegisterUser;
  constructor( public payload: UserInfo) {}
}

export class RegisterUserSuccess implements Action {
  readonly type = LoginActionTypes.RegisterUserSuccess;
  constructor( public payload: UserLoginInfo) {}
}

export type LoginActions = LoginUser |
  LoginUserSuccess |
  LoginUserFailure|
  LogoutUser |
  RegisterUser |
  RegisterUserSuccess;

import { UserInfo, UserLoginInfo } from './../../../models/user';
import { LoginActions, LoginActionTypes } from "./login.actions";


export interface UserState {
  loggedInUser: UserInfo | null,
  registeredUserData: UserLoginInfo | any,
  loginError: boolean;
};

const initialState: UserState = {
  loggedInUser: null,
  registeredUserData: {},
  loginError: false,
};

export function reducer(state = initialState, action: LoginActions): UserState {
  switch (action.type) {

    case LoginActionTypes.LoginUserSuccess:
      return {
        ...state,
        loggedInUser: action.payload,
      };

    case LoginActionTypes.LoginUserSuccess:
      return {
        ...state,
        loggedInUser: action.payload,
      };

    case LoginActionTypes.RegisterUserSuccess:
      return {
        ...state,
        registeredUserData: action.payload
      }

    case LoginActionTypes.LoginUserFailure:
      return {
        ...state,
        loginError: action.payload
      };

    case LoginActionTypes.LogoutUser:
      return {
        ...state,
        loggedInUser: null,
      };


    default:
      return state;
  }
}

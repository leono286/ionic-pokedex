import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from './login.reducer';

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getLoggedInUser = createSelector(
  getUserFeatureState,
  userState => userState.loggedInUser,
);

export const getLoginError = createSelector(
  getUserFeatureState,
  userState => userState.loginError,
);

export const getRegisteredUser = createSelector(
  getUserFeatureState,
  userState => userState.registeredUserData,
);

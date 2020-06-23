import { UserLoginInfo, UserInfo } from './../../../models/user';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { StorageKeys } from './../../../models/storageKeys.enum';
import { from, Observable } from 'rxjs';

@Injectable()
export class LoginService {

  constructor(
    private storage: Storage,
  ) { }

  validateUser(userLoginInfo: UserLoginInfo): Observable<UserInfo | null> {
    return from(this.validateUserWithStorage(userLoginInfo));
  }

  validateUserWithStorage(userLoginInfo: UserLoginInfo): Promise<UserInfo> {
    return this.storage.get(StorageKeys.registeredUsers).then((registeredUsers: UserInfo[]) => {
      const validUser = registeredUsers && registeredUsers.filter(userInfo => userLoginInfo.email === userInfo.email && userLoginInfo.password === userInfo.password);
      return validUser && validUser.length > 0 ? validUser[0] : null;
    });
  }

  registerUser(userInfo: UserInfo): Observable<any> {
    return from(this.saveUserInStorage(userInfo));
  }

  saveUserInStorage(userInfo: UserInfo): Promise<any> {
    return this.storage.get(StorageKeys.registeredUsers).then((registeredUsers: UserInfo[]) => {
      const userAlreadyExists = registeredUsers && registeredUsers.filter(registeredUserInfo => userInfo.email === registeredUserInfo.email && userInfo.password === registeredUserInfo.password).length;
      if (userAlreadyExists) {
        // TODO: create action to throw alert.
        console.log('User already exists');
      }
      const usersToSave = registeredUsers ? registeredUsers : []; 
      usersToSave.push(userInfo);
      return this.storage.set(StorageKeys.registeredUsers, usersToSave).then((resp) => {
        const userLoginInfo = {
          email: userInfo.email,
          password: userInfo.password
        }
        return userLoginInfo;
      });
    });
  }


}

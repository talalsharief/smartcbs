import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserLiveDataService } from './dataservice/user-live-data.service';
import { UserPreferenceTestdsService } from './dataservice/user-preference-testds.service';
import { UserTestDataService } from './dataservice/user-test-data.service';

@Injectable({
  providedIn: 'root'
})
export class DalService {

  constructor(
    public objUserData : UserTestDataService,
    private api:ApiService,
    // private global:GlobalService
    public objUserLiveData : UserLiveDataService,
    private userpreftd: UserPreferenceTestdsService,

  ) { }
  UserSignIn(param) {
    return new Promise((resolve, reject) => {
      try {
        this.objUserData.UserSignInService(param).then((res: any) => {
          if (res != undefined) {
            return resolve(res);
          }
        });
      }
      catch (error) {
        console.log(error);
        return reject(null);
      }
      finally { }
    });

  }
  UserLiveSignIn(param) {
    return new Promise((resolve, reject) => {
      try {
        this.objUserLiveData.UserSignInService(param).then((res: any) => {
          if (res != undefined) {
            // this.global.userData = res[0];
            // this.objlocalstorage.set("userData", this.global.userData);/
            return resolve(res);
          }
        });
      }
      catch (error) {
        console.log(error);
        return reject();
      }

    });

  // }
  }
   // User PReferences DAL OPERATIONS // ADDED ON : 5 April  2021 - 11:47 AM
   UserprefrencesList() {
    return new Promise((resolve, reject) => {
      try {
        this.userpreftd.getUserPrefrencesList().then((res: any) => {
          if (res != undefined) {
            return resolve(res);
          }
        });
      }
      catch (error) {
        console.log(error);
        return reject(null);
      }

    });

  }
}

import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { MeterandconsumerService } from './dataservice/meterandconsumer.service';
import { UserLiveDataService } from './dataservice/user-live-data.service';
import { UserPreferenceTestdsService } from './dataservice/user-preference-testds.service';
import { UserTestDataService } from './dataservice/user-test-data.service';
import { GlobalService } from './global.service';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class DalService {
  authState = new BehaviorSubject(false);
  isLogin = false;

  constructor(
    public objUserData: UserTestDataService,
    private api: ApiService,
    private global: GlobalService,
    public objUserLiveData: UserLiveDataService,
    private userpreftd: UserPreferenceTestdsService,
    private local: LocalstorageService,
    private platform: Platform,
    public meterandconsumer: MeterandconsumerService

  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
      //Getting Server Timestamp
      // firebase.default.firestore.FieldValue.serverTimestamp();

    });
  }

  ifLoggedIn() {
    this.local.get("userData").then((data) => {
      if (data) {
        this.global.UserData = data;
        this.isLogin = true;
        this.authState.next(true);
      }
    });
  }

  isAuthenticated() {
    this.authState.subscribe((data) => {
      if (data) {
        this.local.get("userData").then((data) => {
          if (data) {
            this.global.UserData = data;
          }
        });
      }
    });
    return this.authState.value;
  }

  canActivate(): boolean {
    return this.isAuthenticated();
  }


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
            this.local.set("userData", res);
            return resolve(res);
          }
          else if (res == null) {
            return resolve(res)
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

  FetchMeters(param) {
    return new Promise((resolve, reject) => {
      try {
        this.meterandconsumer.FetchMeter(param).then((res: any) => {
          if (res != undefined) {
            this.local.set("Meters", res);
            this.global.AllMetersList=res;
            return resolve(res);
          }
          else if (res == null) {
            return resolve(res)
          }
        });
      }
      catch (error) {
        console.log(error);
        return reject();
      }
    });
  }

  FetchConsumers(param) {
    return new Promise((resolve, reject) => {
      try {
        this.meterandconsumer.FetchConsumer(param).then((res: any) => {
          if (res != undefined) {
            this.local.set("Consumers", res);
            this.global.AllConsumersList=res;
            return resolve(res);
          }
          else if (res == null) {
            return resolve(res)
          }
        });
      }
      catch (error) {
        console.log(error);
        return reject();
      }
    });
  }


}

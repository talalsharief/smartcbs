import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { MeterandconsumerService } from './dataservice/meterandconsumer.service';
import { SyncdataService } from './dataservice/syncdata.service';
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
    public meterandconsumer: MeterandconsumerService,
    public syncdata:SyncdataService

  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
      //Getting Server Timestamp
      // firebase.default.firestore.FieldValue.serverTimestamp();

    });
  }

  ifLoggedIn() {
    this.local.get("UserData").then((data) => {
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
        this.local.get("UserData").then((data) => {
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
        this.objUserLiveData.UserSignInService(param).then(async(res: any) => {
          if (res != undefined) {
            // this.global.userData = res[0];
            console.log(res)
            await this.local.set("UserData", res);
           
            this.global.UserData = res;
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
        this.meterandconsumer.FetchMeter(param).then(async(res: any) => {
          if (res != undefined) {
            console.log(res.data)
           await this.local.set("Meters", res.data);
          
            this.global.AllMetersList=res.data;
            return resolve(res);
          }
          else if (res == null) {
            return resolve(res.data)
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
            console.log(res.data)
            this.local.set("Consumers", res.data);
            this.global.AllConsumersList=res.data;
            return resolve(res.data);
          }
          else if (res == null) {
            console.log(res)
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

  SyncMeterFeedback(obj) {
    return new Promise((resolve, reject) => {
      try {
        this.syncdata.SyncMeterFeedback(obj).then((res: any) => {
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

  SyncMeterReading(obj) {
    return new Promise((resolve, reject) => {
      try {
        this.syncdata.SyncMeterReading(obj).then((res: any) => {
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

  FetchStatus(param) {
    return new Promise((resolve, reject) => {
      try {
        this.meterandconsumer.FetchStatus(param).then((res: any) => {
          if (res != undefined) {
            this.local.set("Status", res);
            this.global.AllMeterStatus=res;
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


  FetchIndexConfiguration(param) {
    return new Promise((resolve, reject) => {
      try {
        this.meterandconsumer.FetchMeterIndexConfiguration(param).then((res: any) => {
          if (res != undefined) {
            this.local.set("Index", res.data);
            this.global.isIndexReading=res.data;
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

import { Injectable } from '@angular/core';
import { ClasDeviceInfo } from '../classes/clas-device-info';
import { ClsUserData } from '../classes/cls-user-data';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public objUserData : ClsUserData;
  public objDeviceInfo : ClasDeviceInfo;

  constructor() { 
    this.objUserData = new ClsUserData();
  }
  getDeviceInfo() {
    let id;
    let info = window.navigator;
    if (this.objUserData == undefined) {
      id = ""
    }
    else {
      id = this.objUserData.userData.id
    }
    this.objDeviceInfo.deviceinfo = {
      appversion: info.appVersion,
      deviceversion: info.appCodeName,
      platform: info.platform,
      userid: id
    }
    return this.objDeviceInfo.deviceinfo;
  }
}

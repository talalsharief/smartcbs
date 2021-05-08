import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { GlobalService } from './global.service';
import { ClsUserData } from '../classes/cls-user-data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  RequestUrl;
  DeviceInfo;

  public objUserData : ClsUserData
  constructor(
    public http: HttpClient,
    public global: GlobalService
  ) { 
    this.objUserData = new ClsUserData();
  }
  Get(url, params): Promise<any> {
    return new Promise((resolve, error) => {
     let AdvancedParams;
      if(params.page=="login"){
        let Device = { deviceinfo: this.global.getDeviceInfo() };
         AdvancedParams = { ...params, ...Device };
      }
      else{
      // params.params.mcid = this.global.userData.mcid;
      params.params.userid = this.objUserData.userData.id;
      params.params.deviceinfo=this.global.getDeviceInfo()
      
        // AdvancedParams = { ...params, ...device };
      // AdvancedParams = Object.assign(params, device);

      }

      this.http.get(environment.baseURL + url, params).toPromise().then((data: any) => {
        this.RequestUrl = data.url
        console.log("GET Request Url On Success :" + this.RequestUrl);
        return resolve(data);
      }, (ServiceErr) => {
        console.log("GET Request Url On Error :" + this.RequestUrl);
        return error(ServiceErr)

      });
    });
  }


  Post(URL, data) {

    return new Promise((resolve, error) => {
      let obj = {
        // mcid: this.global.userData.mcid,
        userid: this.objUserData.userData.id
      }
      let Device = { deviceinfo: this.global.getDeviceInfo() };
      // let AdvancedParams = { ...data, ...Device };
      let NewData = Object.assign(data, obj);
      let AdvancedParams = Object.assign(NewData, Device);
      //.pipe(map((res: any) => res.json()))

      var _headers = new HttpHeaders();
      // _headers.append('Access-Control-Allow-Origin' , 'http://localhost:8100');
      // _headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      // _headers.append('Accept','*/*');
      // _headers.append('Access-Control-Allow-Credentials','true');    
      _headers.append('Content-Type', 'application/json');
      this.http.post(environment.baseURL + URL, AdvancedParams, { headers: _headers }).subscribe((Respdata:any) => {

        // return resolve(data.d)
        console.log("Success Post Data :" + Respdata.data)

        return resolve(Respdata)
      }
        , (Servererror) => {

          return error(Servererror);
        }
      )

    }
    )
  }


  Delete(URL, params) {

    return new Promise((resolve, error) => {
      // params.params.mcid = this.global.userData.mcid;
      params.params.userid = this.objUserData.userData.id;

      let Device = { deviceinfo: this.global.getDeviceInfo() };
      // let AdvancedParams = { ...params, ...Device };
      let AdvancedParams= Object.assign(params, Device);
      this.http.delete(environment.baseURL + URL,AdvancedParams).toPromise().then((data) => {

        // return resolve(data.d)
        console.log("Success Delete Data :" + data)
        return resolve(data)
      }
        , (Servererror) => {

          return error(Servererror);
        }
      )

    }
    )
  }

  //   Delete(url,data){
  // let headers = new HttpHeaders();

  // headers.append('Content-Type', 'application/json');
  // headers.append('Access-Control-Allow-Origin', '*');
  // headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT');
  // headers.append('Accept', 'application/json');
  // headers.append('Access-Control-Allow-Headers', 'X-Requested-With');

  // return new Promise((resolve, reject) => {
  //   this.http.delete(environment.baseURL+url, data).subscribe(res => {
  //       console.log(res);
  //     }, err => {
  //       console.log(err);
  //     });
  // });
  //   }


  Put(url, param) {
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');
    headers.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    return new Promise((resolve, error) => {
      this.http.put(environment.baseURL + url, param, { headers: headers }).subscribe((data) => {
        return resolve(data);
      }, (Servererror) => {
        return error(Servererror);
      });
    })
  }
}

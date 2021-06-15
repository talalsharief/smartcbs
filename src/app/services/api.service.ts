import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { GlobalService } from './global.service';
import { ClsUserData } from '../classes/cls-user-data';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map'
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  RequestUrl;
  DeviceInfo;

  public objUserData: ClsUserData
  constructor(
    public http: HttpClient,
    public global: GlobalService
  ) {
    this.objUserData = new ClsUserData();
  }
  Get(url): Promise<any> {
    return new Promise((resolve, error) => {
      console.log("Final API Url : "+environment.baseURL + url);
      this.http.get(environment.baseURL + url, { responseType: 'text' }).subscribe((data: any) => {

        let respData= data
        return resolve(respData);
      }, (ServiceErr) => {
        return error(ServiceErr)

      });
    });
  }

  GetWithParams(url, params): Promise<any> {
    return new Promise((resolve, error) => {
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



  // Post(URL, data) {

  //   return new Promise((resolve, error) => {

  //     var _headers = new HttpHeaders();
  //    let headers: {
  //       'Content-Type': 'application/json; charset=utf-8'
  //   }

  //   _headers.set('Content-Type','application/json; charset=utf-8')
    
  //     this.http.post(environment.baseURL + URL, data,{headers:_headers}).pipe().subscribe((Respdata: any) => {


  //       console.log("Success Post Data :" + Respdata.data)

  //       return resolve(Respdata)
  //     }
  //       , (Servererror) => {

  //         return error(Servererror);
  //       }
  //     )

  //   }
  //   )
  // }

 
  Post(url,data) {

    return new Promise((resolve,reject)=>{

      this.http.post(environment.baseURL + url, data).subscribe((response: Response) => {
return resolve(response);

      })

    })
  }

  //   getItems() {
  //   this.http.get('https://example.com/api/items').pipe(map(data => {})).subscribe(result => {
  //     console.log(result);
  //   });
  // }

  Delete(URL, params) {

    return new Promise((resolve, error) => {
      // params.params.mcid = this.global.userData.mcid;
      params.params.userid = this.objUserData.userData.id;

      let Device = { deviceinfo: this.global.getDeviceInfo() };
      // let AdvancedParams = { ...params, ...Device };
      let AdvancedParams = Object.assign(params, Device);
      this.http.delete(environment.baseURL + URL, AdvancedParams).toPromise().then((data) => {

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


  GetLocal(): Promise<any> {
    return new Promise((resolve, error) => {
      // console.log();
      this.http.get("/meterReading.json").subscribe((data: any) => {

        let respData= data
        return resolve(respData);
      }, (ServiceErr) => {
        return error(ServiceErr)

      });
    });
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class UserLiveDataService {

  constructor(
    public api : ApiService
) { }
  UserSignInService(param) {
    return new Promise((resolve, reject) => {
      try{
        this.api.Get("api/user/userlogin",{params: param,observe: 'response',page:"login"}).then((res: any) => {
           let respData = res.body; //todo: to check if status is 1.....
        // })
        if(respData.status ==1){ //valid data{
          console.log("Login Data Fetched")
          console.log("Status:"+respData.status +" and Data:"+respData.data[0])
         
          return  resolve(respData.data);
        }
        else if(respData.status==0)
        {
          console.log("Status:"+respData.status +" and Data:"+null)
          return resolve(respData)
        }
      })
    }
      catch(error){
        console.log(error);
        return reject(null);
      }
      finally{
        
      }
    });
  }
}

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
        this.api.Get('wsMeterReadingUser.asmx/validateUser?_user='+param._user+"&_pwd="+param._pwd).then((res: any) => {
           let respData = res.substring(res.indexOf("{"), res.indexOf("}")+1);
           
        // })
        if(respData){ //valid data{
          let data=JSON.parse(respData);
          return  resolve(data);
        }
        else if(respData==null || respData=="")
        {
          return resolve(null)
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

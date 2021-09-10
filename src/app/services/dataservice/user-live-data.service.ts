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
        this.api.Get('api/user/userlogin?username='+param._user+"&Password="+param._pwd).then((res: any) => {
          //  let respData = res.substring(res.indexOf("{"), res.indexOf("}")+1);
           
        // })
        console.log(res.data[0])
        if(res){ //valid data{
          // let data=JSON.parse(respData);
          return  resolve(res.data[0]);
        }
        else if(res==null || res=="")
        {
          return reject(null)
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

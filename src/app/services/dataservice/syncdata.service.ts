import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class SyncdataService {

  constructor(
    public api : ApiService

  ) { }

  
  SyncMeterFeedback(obj) {
    return new Promise((resolve, reject) => {
      try{
        this.api.Post('api/meterreading/syncmeterreading',obj).then((respData: any) => {
        if(respData){ 
          // let data=JSON.parse(respData);
          return  resolve(respData);
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

  SyncMeterReading(obj) {
    return new Promise((resolve, reject) => {
      try{
        this.api.Post('api/meterreading/syncmeterreading',obj).then((respData: any) => {
          console.log(respData)
        if(respData.data){ 
          // let data=JSON.parse(respData);
          return  resolve(respData.data);
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



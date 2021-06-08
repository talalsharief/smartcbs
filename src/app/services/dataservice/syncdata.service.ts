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
        this.api.Post('wsMeterFeedback.asmx/SyncMeterFeedback',obj).then((respData: any) => {
        if(respData){ 
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

  SyncMeterReading(obj) {
    return new Promise((resolve, reject) => {
      try{
        this.api.Post('wsMeterReading.asmx/SyncMeterReading',obj).then((respData: any) => {
        if(respData){ 
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



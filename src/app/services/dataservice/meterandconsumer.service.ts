import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class MeterandconsumerService {

  constructor(
    public api : ApiService
  ) { }

  FetchMeter(param) {
    return new Promise((resolve, reject) => {
      try{
        this.api.Get('wsControlsFilling.asmx/FetchMeter?MeterReaderID='+param.MeterReaderID).then((res: any) => {
           let respData = res.substring(res.indexOf("["), res.indexOf("]")+1); 

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

  FetchConsumer(param) {
    return new Promise((resolve, reject) => {
      try{
        this.api.Get('wsControlsFilling.asmx/FetchConsumer?MeterReaderID='+param.MeterReaderID).then((res: any) => {
           let respData = res.substring(res.indexOf("["), res.indexOf("]")+1); 

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

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
        this.api.Get('api/fetchmeter/fetchmeter?meterreaderid='+param.MeterReaderID).then((res: any) => {
          console.log(res) 
          // let respData = res.substring(res.indexOf("["), res.indexOf("]")+1); 
          let respData =res
            console.log('Fetch Meter'+respData)
        if(respData){ 
          console.log('Fetched !')
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

  FetchConsumer(param) {
    return new Promise((resolve, reject) => {
      try{
        this.api.Get('api/fetchconsumes/fetchconsumer?meterreaderid='+param.MeterReaderID).then((res: any) => {
          //  let respData = res.substring(res.indexOf("["), res.indexOf("]")+1); 
          let respData =res
            console.log('Fetch Consumers'+respData)
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

  FetchStatus(param) {
    return new Promise((resolve, reject) => {
      try{
        this.api.Get('api/fillappmeter/fillappmeterstatus?userid='+param.UserID).then((res: any) => {
          //  let respData = res.substring(res.indexOf("["), res.indexOf("]")+1); 
          let respData =res
            console.log('Meter Status'+respData)
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

  FetchMeterIndexConfiguration(param) {
    return new Promise((resolve, reject) => {
      try{
        
        this.api.Get('api/fetchmeterindex/fetchmeterindexinconfiguration'+param.MeterReaderID).then((res: any) => {
          //  let respData = res.substring(res.indexOf("["), res.indexOf("]")+1); 
           let respData =res
              console.log(respData)
        if(respData){ 
          // let data=respData.includes("true");
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
}

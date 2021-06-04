import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class UserPreferenceTestdsService {

  params={
    mcid:"",
    userid:""
  }
  constructor(
    public api : ApiService
  ) { }
  AddUserPrefrences(Data: any) {
    return new Promise((resolve, reject) => {
      try {
        if (Data != undefined) {
           this.api.Post("api/sale/savesale", Data).then((data: any) => {
             let respData = data; //todo: to check if status is 1.....
          if (respData.status == 1) { //valid data{
            return resolve(respData.data);
          }
         else if (respData.status == 0) { //valid data{
            return resolve(respData);
          }
        })
      }
    }
      catch (error) {
        console.log(error);
        return reject(null);
      }
    })
  }



  // getSingleUserPrefrences(SalePersonID):Promise<Boolean> {
  //   return new Promise((resolve, reject) => {
  //     try{
  //       let id={id:SalePersonID}
  //       let NewParam=Object.assign(id,this.params)
  //       this.api.Get('api/sale/getsinglesale', {params:NewParam ,observe: 'response'}).then(data => {
  //         let respData=data.body;
  //         if (respData.status == 1) { 
  //           console.log("Sale by Id Data Fetched");
  //           return resolve(respData.data);
  //         }
  //         if (respData.status == 0) { 
  //           console.log("Sale by Id Data Not Fetched");
  //           return resolve(respData);
  //         }

  //       })
  //     }
  //     catch(error){
  //       return reject(error)
  //     }
  //   })

   
  // }




 }

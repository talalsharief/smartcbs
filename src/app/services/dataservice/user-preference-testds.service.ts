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



  getSingleUserPrefrences(SalePersonID):Promise<Boolean> {
    return new Promise((resolve, reject) => {
      try{
        let id={id:SalePersonID}
        let NewParam=Object.assign(id,this.params)
        this.api.Get('api/sale/getsinglesale', {params:NewParam ,observe: 'response'}).then(data => {
          let respData=data.body;
          if (respData.status == 1) { 
            console.log("Sale by Id Data Fetched");
            return resolve(respData.data);
          }
          if (respData.status == 0) { 
            console.log("Sale by Id Data Not Fetched");
            return resolve(respData);
          }

        })
      }
      catch(error){
        return reject(error)
      }
    })

      // .catch(console.log);
  }

  getUserPrefrencesList() {
    return new Promise((resolve, reject) => {
      try {
         this.api.Get("api/userprefrence/getalluserprefrence", {params:this.params ,observe: 'response'}).then((data: any) => {
           let respData = data.body; //todo: to check if status is 1.....
        if (respData.status == 1) { //valid data{
          return resolve(respData.data);
        }
        else if (respData.status == 0) { //valid data{
          return resolve(respData);
        }
      })
    }
    catch (error) {
      console.log(error);
      return reject(null);
    }
  })
  }
  
  DeleteUserPrefrences(params: any) {
    return new Promise((resolve, reject) => {
      try {
           this.api.Delete("api/sale/deletesale", {params:params ,observe: 'response'}).then((data: any) => {
             let respData = data.body; //todo: to check if status is 1.....
          if (respData.status == 1) { //valid data{
            return resolve(respData.data);
      }
     else if (respData.status == 0) { //valid data{
        return resolve(respData); 
  }
      })
    }
      catch (error) {
        console.log(error);
        return reject(null);
      }
    })
  }

  //Added 3Mar 2021 at 12:14AM by #SHAZ
getSaleCode():Promise<Boolean> {
  return new Promise((resolve, reject) => {
    try{
      this.api.Get('api/sale/getsaleno', {params:this.params ,observe: 'response'}).then(data => {
        let respData=data.body;
        if (respData.status == 1) { 
          console.log("SaleCode Data Fetched");
          return resolve(respData.data);
        }
        else if (respData.status == 0) { //valid data{
          return resolve(respData);
        }

      })
    }
    catch(error){
      return reject(error)
    }
  })

 
}
}

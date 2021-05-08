import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserTestDataService {

  constructor() { }
  UserSignInService(param) {
    return new Promise((resolve, reject) => {
      try{
        let apiData = {
          username: param.username,
          password: param.password
        }
        let respData = {
          status: 1,
          data: {
            userid: 1,
            name: "Shahzaib",
            username: "shahzaib62342",
            email: "shahzaib@gmail.com"
          },
          error: {
            errorid: 0,
            errortype: "",
            errormsg: "",
            additionalmsg: ""
          }
        }
        // this.api.Post("/user/login", apiData).then((res: any) => {
        //   let data = res; //todo: to check if status is 1.....
        // })
        if(respData.status == 1){ //valid data{
          return  resolve(respData.data);
        }
      }
      catch(error){
        console.log(error);
        return reject(null);
      }
    });
  }
}

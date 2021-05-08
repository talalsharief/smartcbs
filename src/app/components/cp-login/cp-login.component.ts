import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ClsLogin } from 'src/app/classes/cls-login';
import { ClsUserData } from 'src/app/classes/cls-user-data';
import { DalService } from 'src/app/services/dal.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-cp-login',
  templateUrl: './cp-login.component.html',
  styleUrls: ['./cp-login.component.scss'],
})
export class CpLoginComponent implements OnInit {

  // Classes in classes Folder
  public objLogin : ClsLogin;
  public objUserData : ClsUserData;

  constructor(
    private dal:DalService,
    private nav:NavController,
    // private global:GlobalService,
    private local:LocalstorageService,
    private toast:ToastService,
  ) {}

  ngOnInit() {
    this.objLogin = new ClsLogin();
    this.objUserData = new ClsUserData();
  }

 
  btnLogin(){ 
    if(this.objLogin.Username == null || this.objLogin.Password == null){
      console.log(this.objLogin.Username);
     this.toast.ShowCustomToast('<ion-icon name="alert-circle"></ion-icon> Enter Username/Password' , "error" );

    }else{
      let obj={
        username:this.objLogin.Username,
        password:this.objLogin.Password
      }
      this.nav.navigateRoot("home");
      
    // this.dal.UserLiveSignIn(obj).then((res:any)=>{
    //   try{
    //   let data=res;
    //   if(data.length>0){
    //     // this.dal.UserprefrencesList().then((user:any)=>{
    //     //   if(user !=undefined){
    //     //     this.objUserData.userPreferences=user; 
    //     //     this.local.set('userPreferences',this.global.userPreferences);
    //     //     this.toast.Showtoast("Login Succesfully", "success");
    //     //     this.appcomponent.FillLocalStorageIfEmpty();
    //     //     this.nav.navigateRoot("home");
    //     //   }
  
  
    //     // }) 

      
    //   }
    //   else if(data.status==0){
    //      console.log("Invalid Email or Password");
    //     this.toast.Showtoast("Username or password invalid", "error");

    //   }
    // }
    // catch(error){
    //   console.log(error);
    // }
    // })

  }
  }
  IsPassShow = false;
  
  togglePassword() {
    var passwordInput = (<HTMLInputElement>document.getElementById('txtPassword'));
     var toggle = document.getElementById('btneyeicon');
     var icon =  document.getElementById('eyeIcon');
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      this.IsPassShow = true;
      //toggle.innerHTML = 'hide';
    } else {
      passwordInput.type = 'password';
      this.IsPassShow = false;
      //toggle.innerHTML = 'show';
    }
  }
}

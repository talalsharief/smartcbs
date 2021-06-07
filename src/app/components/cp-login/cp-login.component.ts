import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ClsLogin } from 'src/app/classes/cls-login';
import { ClsUserData } from 'src/app/classes/cls-user-data';
import { DalService } from 'src/app/services/dal.service';
import { GlobalService } from 'src/app/services/global.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-cp-login',
  templateUrl: './cp-login.component.html',
  styleUrls: ['./cp-login.component.scss'],
})
export class CpLoginComponent implements OnInit {

  // Classes in classes Folder
  public objLogin: ClsLogin;
  public objUserData: ClsUserData;

  constructor(
    private dal: DalService,
    private nav: NavController,
    private global: GlobalService,
    private local: LocalstorageService,
    private toast: ToastService,


  ) { }

  ngOnInit() {
    this.objLogin = new ClsLogin();
    this.objUserData = new ClsUserData();
  }


  btnLogin() {
    if (this.objLogin.Username == "" || this.objLogin.Password == "") {

      this.toast.ShowCustomToast('<ion-icon name="alert-circle"></ion-icon> Enter Username/Password', "error");

    } else {
      let obj = {
        _user: this.objLogin.Username,
        _pwd: this.objLogin.Password
      }
      this.dal.UserLiveSignIn(obj).then((data: any) => {
        if (data) {
          this.global.UserData = data;
          this.toast.ShowCustomToast('<ion-icon name="checkmark-outline"></ion-icon> Login Successfully', "success");
          //  this.dal.isLogin=true;
          this.global.GetDataFromLocal();
          this.nav.navigateRoot("home");

        }
        else if (data == null) {
          this.toast.ShowCustomToast('<ion-icon name="alert-circle"></ion-icon>Invalid Username or password', "error");

        }
      })
    }
  }
  IsPassShow = false;

  togglePassword() {
    var passwordInput = (<HTMLInputElement>document.getElementById('txtPassword'));
    var toggle = document.getElementById('btneyeicon');
    var icon = document.getElementById('eyeIcon');
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

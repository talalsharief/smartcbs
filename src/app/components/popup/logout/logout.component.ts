import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {

  constructor(
    private modalController : ModalController,private global :GlobalService ,
    private navController :NavController,
    public local:LocalstorageService

  ) { }

  ngOnInit() {}

  btnCancel(){
    this.modalController.dismiss();

  }
  btnLogout(){
    this.local.remove("userData");
    this.navController.navigateRoot("login")
    this.modalController.dismiss();
  }
}

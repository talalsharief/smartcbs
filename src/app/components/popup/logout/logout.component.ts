import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {

  constructor(
    private modalController : ModalController,private global :GlobalService ,
    private navController :NavController

  ) { }

  ngOnInit() {}

  btnCancel(){
    this.modalController.dismiss();

  }
  btnLogout(){
    this.navController.navigateRoot("login")
    this.modalController.dismiss();
    

  }
}

import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { LogPopupComponent } from '../log-popup/log-popup.component';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
})
export class AlertModalComponent implements OnInit {

  constructor(
    private modalController : ModalController,private global :GlobalService ,private navController :NavController
  ) {
    
   }

  ngOnInit() {}
  
  async btnYesSync(){
    this.modalController.dismiss();
   
  }
  async btnYesEdit(){
    this.modalController.dismiss().then(()=> this.navController.pop());
    const modal = await this.modalController.create({
      component: LogPopupComponent,
      // cssClass: 'CustomPopUp'
    });
    return await modal.present();
  }
 
}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LogPopupComponent } from '../popup/log-popup/log-popup.component';

@Component({
  selector: 'app-cp-log',
  templateUrl: './cp-log.component.html',
  styleUrls: ['./cp-log.component.scss'],
})
export class CpLogComponent implements OnInit {

  constructor(
    private modalController : ModalController
  ) { }

  ngOnInit() {}
 
 async btnEdit(){
    const modal = await this.modalController.create({
      component: LogPopupComponent,
      // cssClass: 'CustomPopUp'
    });
    return await modal.present();
  }

  }


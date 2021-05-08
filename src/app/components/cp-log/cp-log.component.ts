import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { AlertModalComponent } from '../popup/alert-modal/alert-modal.component';
import { LogPopupComponent } from '../popup/log-popup/log-popup.component';

@Component({
  selector: 'app-cp-log',
  templateUrl: './cp-log.component.html',
  styleUrls: ['./cp-log.component.scss'],
})
export class CpLogComponent implements OnInit {

  constructor(
    private modalController : ModalController, private global : GlobalService
  ) { }

  ngOnInit() {}
 
 async btnEdit(){
   this.global.IsEdit =true
   this.global.IsSync = false;

    const modal = await this.modalController.create({
      component: AlertModalComponent,
      cssClass: 'CustomPopUp'
    });
    return await modal.present();
  }

  

  }


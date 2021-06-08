import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { AlertModalComponent } from '../popup/alert-modal/alert-modal.component';

@Component({
  selector: 'app-cp-sync-data',
  templateUrl: './cp-sync-data.component.html',
  styleUrls: ['./cp-sync-data.component.scss'],
})
export class CpSyncDataComponent implements OnInit {

  
  constructor(
    private modalController :ModalController ,private global : GlobalService ,private navController :NavController
  ) {
   
   }

  ngOnInit() {
   

  }
  async btnSync(){
    this.global.IsSync = true;
    this.global.IsEdit = false;
    this.global.isFetch = false;
    const modal = await this.modalController.create({
      component: AlertModalComponent,
      cssClass: 'CustomPopUp'
    });
    return await modal.present();
    
  }

  GetUnSyncData(){
    let value=  this.global.AllConsumerMeters.filter(x => x.isSend == false).length;
    return value;
    }
  
}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PgSettingPage } from 'src/app/pages/pg-setting/pg-setting.page';
import { GlobalService } from 'src/app/services/global.service';
import { AlertModalComponent } from '../popup/alert-modal/alert-modal.component';

@Component({
  selector: 'app-cp-setting',
  templateUrl: './cp-setting.component.html',
  styleUrls: ['./cp-setting.component.scss'],
})
export class CpSettingComponent implements OnInit {

  constructor(
    private global : GlobalService , private modalController : ModalController
  ) { 
    
  }

  ngOnInit() {
  
  }
  async btnFetch(){
    this.global.isFetch = true
    this.global.IsSync = false;
    this.global.IsEdit = false

    const modal = await this.modalController.create({
      component: AlertModalComponent,
      cssClass: 'CustomPopUp'
    });

   

    return await modal.present();
    
  }

}

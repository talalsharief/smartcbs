import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { PgSettingPage } from 'src/app/pages/pg-setting/pg-setting.page';
import { GlobalService } from 'src/app/services/global.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { AlertModalComponent } from '../popup/alert-modal/alert-modal.component';

@Component({
  selector: 'app-cp-setting',
  templateUrl: './cp-setting.component.html',
  styleUrls: ['./cp-setting.component.scss'],
})
export class CpSettingComponent implements OnInit {
  LastFechedDateTime = ""
  constructor(
    private global: GlobalService,
    private modalController: ModalController,
    public local: LocalstorageService
  ) {
    this.local.get("LastFetchDateTime").then((datetime) => {
      if (datetime != null) {
         this.LastFechedDateTime=datetime
      }

    })
  }
  ngOnInit() {

  }
  async btnFetch() {
    this.global.isFetch = true
    this.global.IsSync = false;
    this.global.IsEdit = false
    const modal = await this.modalController.create({
      component: AlertModalComponent,
      cssClass: 'CustomPopUp'
    });
    return await modal.present();
  }

  
  GetLastFeteched(){
    this.local.get("LastFetchDateTime").then((datetime) => {
      if (datetime != null || datetime !="") {
        return moment(datetime,'DD MM YYYY, h:mm:ss A').fromNow() 
      }
      else
      {
        return "-"
      }

    })
   
    }

}

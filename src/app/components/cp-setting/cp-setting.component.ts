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
  FetchDataHistoryList=[]
  constructor(
    private global: GlobalService,
    private modalController: ModalController,
    public local: LocalstorageService
  ) {
    this.GetFetchDataHistory()
    this.local.get("LastFetchDateTime").then((datetime) => {
      if (datetime != null) {
         this.LastFechedDateTime=datetime
      this.LastFechedDateTime=   moment(datetime,'MM/DD/YYYY, h:mm:ss A').fromNow()
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

  
  GetLastFeteched(datetime){
    // 6/8/2021, 12:53:38 PM
   return moment(datetime,'MM/DD/YYYY, h:mm:ss A').fromNow()
    }

    GetFetchDataHistory(){
      this.local.get("DataFetch").then((data)=>{
        if(data){
          this.FetchDataHistoryList=data
        }
      })
    }

}

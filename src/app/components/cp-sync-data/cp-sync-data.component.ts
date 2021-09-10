import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { AlertModalComponent } from '../popup/alert-modal/alert-modal.component';
import * as moment from 'moment';

@Component({
  selector: 'app-cp-sync-data',
  templateUrl: './cp-sync-data.component.html',
  styleUrls: ['./cp-sync-data.component.scss'],
})
export class CpSyncDataComponent implements OnInit {
  LastSyncedDateTime=""
  SyncDataHistoryList=[]
  constructor(
    private modalController :ModalController ,
    public global : GlobalService ,
    private navController :NavController,
    private local:LocalstorageService
  ) {
    
    this.GetSyncDataHistory()
    this.local.get("LastSyncDateTime").then((datetime) => {
      console.log(datetime)
      if (datetime != null) {
         this.LastSyncedDateTime=datetime
      this.LastSyncedDateTime= this.global.GetRelativeTime(datetime)
      }

    })
    this.GetUnSyncData()
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

    GetLastSynced(datetime){
      // 6/8/2021, 12:53:38 PM
     return moment(datetime,'MM/DD/YYYY, h:mm:ss A').fromNow()
      }

    GetSyncDataHistory(){
      this.local.get("DataSync").then((data)=>{
        console.log(data)
        if(data){
          this.SyncDataHistoryList=data
        }
      })
    }
  
}

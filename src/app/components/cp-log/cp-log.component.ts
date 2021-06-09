import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { AlertModalComponent } from '../popup/alert-modal/alert-modal.component';
import { LogPopupComponent } from '../popup/log-popup/log-popup.component';

@Component({
  selector: 'app-cp-log',
  templateUrl: './cp-log.component.html',
  styleUrls: ['./cp-log.component.scss'],
})
export class CpLogComponent implements OnInit {

  MeterReadingList = []
  AllReadingFeedbackList = [];
  highlightedDiv: number;

  constructor(
    private modalController: ModalController,
    private global: GlobalService,
    public local: LocalstorageService,
    public nav:NavController
  ) {

  }

  ngOnInit() {
    this.global.getAllConsumerMeters()
    this.GetAllReadingFeedback(1);
    this.highlightedDiv = 1;

  }

  async btnEdit(id,type) {
    this.global.IsEdit = true
    this.global.IsSync = false;
    this.global.isFetch = false;
    this.GetEditData(id,type).then(async (data)=>{

      if(data !=undefined){
        const modal = await this.modalController.create({
          component: AlertModalComponent,
          cssClass: 'CustomPopUp',
          componentProps:{data:data,type:type}
        });
        return await modal.present();
      }
    })
  
 
  }




  btnFilterlog(newValue: number) {
    if (this.highlightedDiv === newValue) {
      this.highlightedDiv = 0;
    }
    else {
      this.highlightedDiv = newValue;
    }
  }

  GetMeterReadingList(newValue) {
    this.global.MeterReadingList=[]
    if (this.highlightedDiv === newValue) {
      this.highlightedDiv = 0;
    }
    else {
      this.highlightedDiv = newValue;
    }

    this.global.MeterReadingList = this.global.AllConsumerMeters.filter(x => x.IsReadingAdded == true);
    this.global.AllFilterMeterReading=this.global.MeterReadingList;

  }

  GetAllReadingFeedback(newValue) {
    this.highlightedDiv = newValue;
    this.global.MeterReadingList = this.global.AllConsumerMeters.filter(x => x.IsReadingAdded == true || x.IsFeedbackAdded == true);
    this.global.AllFilterMeterReading=this.global.MeterReadingList;
  }

  GetFeedBackList(newValue) {
    if (this.highlightedDiv === newValue) {
      this.highlightedDiv = 0;
    }
    else {
      this.highlightedDiv = newValue;
    }
    this.global.MeterReadingList = this.global.AllConsumerMeters.filter(x => x.IsFeedbackAdded == true);
    this.global.AllFilterMeterReading=this.global.MeterReadingList;
  }

  goto_MeterReading(data){
    if(data !=undefined){
      let navigationExtras: NavigationExtras = {
        queryParams: {
            consumerdata: JSON.stringify(data)
        }
    };
    this.nav.navigateForward(['meterreading'], navigationExtras);
    }

  }

  GetEditData(id,type){
    return new Promise((resolve,reject)=>{
      if(type==1){
        let data = this.global.AllConsumerMeters.find(x => x.MeterID == id);
      //  let data= this.global.AllMeterReading.find(x=>x.ID==id);
      //  let consumer=this.global.AllConsumersList.find(x=>x.)
       console.log(data)
       return resolve(data);
      }
      else if(type==2){
        let data=this.global.AllConsumerMeters.find(x=>x.FeedbackId==id);
       console.log(data)

        return resolve(data);
      }
    })
  }


  CheckIsSync(MeterorFeedback,obj){
      if(obj && MeterorFeedback==1)
      {
        return obj.isSend;
      }
      if(obj && MeterorFeedback==2)
      {
        return obj.isSend;
      }
  }


}


import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  MeterReadingList=[]
  MeterFeedbackList=[]
  AllReadingFeedbackList=[]
  constructor(
    private modalController: ModalController, 
    private global: GlobalService,
    public local:LocalstorageService
  ) {
    
   }

  ngOnInit() { 
    this.highlightedDiv = 1;

  }

  async btnEdit() {
    this.global.IsEdit = true
    this.global.IsSync = false;
    this.global.isFetch = false;

    const modal = await this.modalController.create({
      component: AlertModalComponent,
      cssClass: 'CustomPopUp'
    });
    return await modal.present();
  }


  
  highlightedDiv: number;

  btnFilterlog(newValue: number) {
  if (this.highlightedDiv === newValue) {
    this.highlightedDiv = 0;
  }
  else {
    this.highlightedDiv = newValue;
  }
}
GetMeterReadingList(newValue){
  this.MeterReadingList=[]
  if (this.highlightedDiv === newValue) {
    this.highlightedDiv = 0;
  }
  else 
  {
    this.highlightedDiv = newValue;
  }

  this.MeterReadingList= this.global.AllConsumerMeters.filter(x=>x.IsReadingAdded==true);
}

GetAllReadingFeedback(newValue){
  if (this.highlightedDiv === newValue) {
    this.highlightedDiv = 0;
  }
  else 
  {
    this.highlightedDiv = newValue;
  }
  this.MeterFeedbackList= this.global.AllConsumerMeters.filter(x=>x.IsReadingAdded==true || x.IsFeedbackAdded==true);
}

GetFeedBackList(newValue){
  if (this.highlightedDiv === newValue) {
    this.highlightedDiv = 0;
  }
  else 
  {
    this.highlightedDiv = newValue;
  }
  this.MeterFeedbackList= this.global.AllConsumerMeters.filter(x=>x.IsFeedbackAdded==true);
}

}


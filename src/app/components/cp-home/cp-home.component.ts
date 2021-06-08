import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import * as moment from 'moment';
import { NavController } from '@ionic/angular';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-cp-home',
  templateUrl: './cp-home.component.html',
  styleUrls: ['./cp-home.component.scss'],
})
export class CpHomeComponent implements OnInit {

  TodayDate= new Date().toDateString()
LastFetched="";
  constructor(

    public toast:ToastService,
    public local:LocalstorageService,
    public nav:NavController,
    public global:GlobalService
  ) {
    this.local.get("LastFetchDateTime").then((data)=>{
      if(data){
        this.LastFetched=this.global.GetRelativeTime(data);
      }
      }).then(()=>{
        this.GetLastFeteched();
      })
   }

  ngOnInit() {}


  GetLastFeteched(){
      return moment(this.LastFetched,'MM/DD/YYYY, h:mm:ss A').fromNow()
      }

      Added:number
      GetMeterFeedbackAddedCount(){
      let value=  this.global.AllConsumerMeters.filter(x => x.IsReadingAdded == true || x.IsFeedbackAdded == true).length;
      if(value){
        return this.Added=value
      }
      }

       percentageMeterFeedbackDone() {
         let total=this.global.AllConsumerMeters.length;
        return ((100 * this.Added) / total).toFixed(1);
     }

     GetUnSyncData(){
      let value=  this.global.AllConsumerMeters.filter(x => x.isSend == false).length;
      return value;
      }


      GotoFetchData(){
        this.nav.navigateForward('setting');
      }
}

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
      else
      {
        this.LastFetched="-"
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
        this.percentageMeterFeedbackDone()
        return this.Added=value

      }
      else
      {
        return 0;
      }
      }

       percentageMeterFeedbackDone() {
         let total=this.global.AllConsumerMeters.length;
        let percentage= ((100 * this.Added) / total).toFixed(1);
        if(percentage !="NaN"){
          return percentage;
        }
        else
        {
          return 0;
        }
     }

     GetUnSyncData(){
      let value=  this.global.AllConsumerMeters.filter(x => x.isSend == false).length;
      return value;
      }


      GotoFetchData(){
        this.nav.navigateForward('setting');
      }
}

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
LastSynced=""
  constructor(

    public toast:ToastService,
    public local:LocalstorageService,
    public nav:NavController,
    public global:GlobalService
  ) {
    this.global.GetDataFromLocal();
    this.global.getAllConsumerMeters()
    this.local.get("LastFetchDateTime").then((data)=>{
      if(data){
        this.LastFetched= this.global.GetRelativeTime(data);
      }
      else
      {
        this.LastFetched="-"
      }
      }).then(()=>{
         this.GetLastFeteched();
      })

      this.local.get("LastSyncDateTime").then(async (data)=>{
        console.log(data)
        if(data){
          this.LastSynced= await this.global.GetRelativeTime(data);
        }
        else
        {
          this.LastSynced="-"
        }
        }).then(()=>{
          this.GetLastSynced();
        })

      this.local.get("userData").then((data)=>{
      
        if(data){
           
        }
      })
      this.GetUnSyncData()
      
      
       
       
    
     
   }
   progress
   progressText=""
    
   
  ngOnInit() {
    this.global.getAllConsumerMeters()
     this.percentageMeterFeedbackDone()
       
      setInterval(() => { 
        this.local.get("LastFetchDateTime").then(async(data)=>{
          if(data){
            this.LastFetched= await this.global.GetRelativeTime(data);
          }
          else
          {
            this.LastFetched="-"
          }
          }).then(()=>{
             this.GetLastFeteched();
          })

          this.local.get("LastSyncDateTime").then(async (data)=>{
            console.log(data)
            if(data){
              this.LastSynced= await this.global.GetRelativeTime(data);
            }
            else
            {
              this.LastSynced="-"
            }
            }).then(()=>{
              this.GetLastSynced();
            })
     }, 10000);
    
    
      
      

  }


  GetLastFeteched(){
      return moment(this.LastFetched,'MM/DD/YYYY, h:mm:ss A').fromNow()
      }
      GetLastSynced(){
        return moment(this.LastSynced,'MM/DD/YYYY, h:mm:ss A').fromNow()
        }

      Added:number
      GetMeterFeedbackAddedCount(){
      
      let value=  this.global.AllConsumerMeters.filter(x => x.IsReadingAdded == true || x.IsFeedbackAdded == true).length;
      if(value){
        this.percentageMeterFeedbackDone()
        this.global.MeterReadingAddedCount = value
        return this.Added=this.global.MeterReadingAddedCount

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
          this.progress = percentage
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

      GotoSyncData(){
        this.nav.navigateForward('syncdata');
      }
      GotoFetchData(){
        this.nav.navigateForward('setting');
      }
}

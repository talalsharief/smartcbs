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
        this.LastFetched=data;
      }
      }).then(()=>{
        this.GetLastFeteched();
      })
   }

  ngOnInit() {}


  GetLastFeteched(){
      return moment(this.LastFetched,'DD MM YYYY, h:mm:ss A').fromNow()
      }
    
  

}

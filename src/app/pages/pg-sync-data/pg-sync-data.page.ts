import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-pg-sync-data',
  templateUrl: './pg-sync-data.page.html',
  styleUrls: ['./pg-sync-data.page.scss'],
})
export class PgSyncDataPage implements OnInit {

  constructor(public nav:NavController, public global:GlobalService,public local:LocalstorageService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.local.get("LastSyncDateTime")
  }
  back(){
    this.nav.navigateRoot("home");
  }
}

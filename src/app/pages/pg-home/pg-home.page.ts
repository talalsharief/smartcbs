import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LogPopupComponent } from 'src/app/components/popup/log-popup/log-popup.component';
import { LogoutComponent } from 'src/app/components/popup/logout/logout.component';
import { GlobalService } from 'src/app/services/global.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-pg-home',
  templateUrl: './pg-home.page.html',
  styleUrls: ['./pg-home.page.scss'],
})
export class PgHomePage implements OnInit {

  constructor(
    private modalController : ModalController,
    public global:GlobalService,
    public local:LocalstorageService

  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    
     
      this.global.getAllConsumerMeters()
   
      this.local.get("userData")
    
  
  }
  async btnLogout(){
    const modal = await this.modalController.create({
      component: LogoutComponent,
      cssClass: 'CustomPopUp'
    });
    return await modal.present();
  }

}

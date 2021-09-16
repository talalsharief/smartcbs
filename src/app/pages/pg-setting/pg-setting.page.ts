import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { AlertModalComponent } from '../../components/popup/alert-modal/alert-modal.component';

@Component({
  selector: 'app-pg-setting',
  templateUrl: './pg-setting.page.html',
  styleUrls: ['./pg-setting.page.scss'],
})
export class PgSettingPage implements OnInit {

  constructor(public nav:NavController, public global:GlobalService, public modalController:ModalController) { }

  ngOnInit() {
  }
  back(){
   this.nav.navigateRoot("home")
  }
  ionViewWillEnter() {
    this.global.GetDataFromLocal()
    this.global.getAllConsumerMeters()
  }
  async clear(){
    this.global.IsSync = false;
    this.global.isClear = true;
    this.global.IsEdit = false;
    this.global.isFetch = false;
    const modal = await this.modalController.create({
      component: AlertModalComponent,
      cssClass: 'CustomPopUp'
    });
    return await modal.present();
  }
}

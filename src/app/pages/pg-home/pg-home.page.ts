import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LogPopupComponent } from 'src/app/components/popup/log-popup/log-popup.component';
import { LogoutComponent } from 'src/app/components/popup/logout/logout.component';

@Component({
  selector: 'app-pg-home',
  templateUrl: './pg-home.page.html',
  styleUrls: ['./pg-home.page.scss'],
})
export class PgHomePage implements OnInit {

  constructor(
    private modalController : ModalController

  ) { }

  ngOnInit() {
  }

  async btnLogout(){
    const modal = await this.modalController.create({
      component: LogoutComponent,
      cssClass: 'CustomPopUp'
    });
    return await modal.present();
  }

}

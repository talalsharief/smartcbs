import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LogPopupComponent } from 'src/app/components/popup/log-popup/log-popup.component';
import { LogfilterComponent } from 'src/app/components/popup/logfilter/logfilter.component';

@Component({
  selector: 'app-pg-log',
  templateUrl: './pg-log.page.html',
  styleUrls: ['./pg-log.page.scss'],
})
export class PgLogPage implements OnInit {

  constructor(
    private modalController : ModalController

  ) { }

  ngOnInit() {
  }

  async btnShowLog(){
    const modal = await this.modalController.create({
      component: LogfilterComponent,
      // cssClass: 'CustomPopUp'
    });
    return await modal.present();
  }
}

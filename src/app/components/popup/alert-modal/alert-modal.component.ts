import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { LogPopupComponent } from '../log-popup/log-popup.component';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
})
export class AlertModalComponent implements OnInit {

  constructor(
    private modalController: ModalController, private global: GlobalService, private navController: NavController
  ) {

  }

  ngOnInit() {

  }

  async btnYesSync() {
    // gear gif show and button hide
    this.global.isSyncing = true;
    this.global.btnSync = false;
    setTimeout(() => {
      // gear gif hide and done icon show
      this.global.isSyncing = false
      this.global.DoneSync = true
      setTimeout(() => {
      //  done icon hide and sync button show
        this.global.DoneSync = false
        this.global.btnSync = true;

      }, 4000);
    }, 3000);
    this.modalController.dismiss();

  }
  async btnCancel() {
    this.modalController.dismiss();

  }
  async btnYesEdit() {
    this.modalController.dismiss().then(() => this.navController.navigateRoot("/log"));
    const modal = await this.modalController.create({
      component: LogPopupComponent,
      // cssClass: 'CustomPopUp'
    });
    return await modal.present();
  }
  Syncing() {
  }

  btnYesFetched() {
    this.global.isFetched = true
    this.global.btnFetch = false;
    setTimeout(() => {
      // gear gif hide and done icon show
      this.global.isFetched = false
      this.global.DoneFetched = true
      setTimeout(() => {
      //  done icon hide and fetch button show
        this.global.DoneFetched = false
        this.global.btnFetch = true;

      }, 4000);
    }, 3000);
    this.modalController.dismiss();

  }

}

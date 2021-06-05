import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import * as moment from 'moment';
import { DalService } from 'src/app/services/dal.service';
import { GlobalService } from 'src/app/services/global.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToastService } from 'src/app/services/toast.service';
import { LogPopupComponent } from '../log-popup/log-popup.component';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
})
export class AlertModalComponent implements OnInit {

  constructor(
    private modalController: ModalController,
    private global: GlobalService,
    private navController: NavController,
    public dal: DalService,
    public local: LocalstorageService,
    public toast: ToastService
  ) {

  }

  ngOnInit(

  ) {

  }
  async btnYesSync() {
    //gear gif show and button hide
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
    this.global.isFetched = true;
    this.global.btnFetch = false;
    this.global.AllFetched = 0;
    this.local.get("userData").then((data) => {
      if (data) {
        let obj = {
          MeterReaderID: data.MTUserID
        }
        this.dal.FetchConsumers(obj).then((consumers) => {
          if (consumers) {
            // this.global.isFetched = false
            // this.global.DoneFetched = true
            console.log("Consumers list fetched")
            this.global.AllFetched++;
            this.isFectched();
       
          }
          else if (consumers == null) {
            console.log("Consumers list fetched failed")
          }
        });
        // this.global.isFetched = true;
        // this.global.btnFetch = false;
        this.dal.FetchMeters(obj).then((meters) => {
          if (meters) {
            this.global.isFetched = false
            this.global.DoneFetched = true
            console.log("Meters list fetched")
            this.global.AllFetched++;
            this.isFectched()
            //  this.toast.ShowCustomToast('<ion-icon name="checkmark-outline"></ion-icon> Meters list fetched' , "success" );

          }
          else if (meters == null) {
            console.log("Meters list fetched failed")

            // this.toast.ShowCustomToast('<ion-icon name="alert-circle"></ion-icon> Meters list fetched failed' , "error" );

          }

        })
      }
    })


    // setTimeout(() => {
    //   // gear gif hide and done icon show
    //   this.global.isFetched = false
    //   this.global.DoneFetched = true
    //   setTimeout(() => {
    //   //  done icon hide and fetch button show
    //     this.global.DoneFetched = false
    //     this.global.btnFetch = true;

    //   }, 4000);
    // }, 3000);
    this.modalController.dismiss();

  }

  isFectched(){
    if (this.global.AllFetched >= 2) {
      this.local.set("LastFetchDateTime",moment().format('DD MM YYYY, h:mm:ss A'));
      this.global.DoneFetched = false;
      this.global.btnFetch = true;
      this.toast.ShowCustomToast('<ion-icon name="checkmark-outline"></ion-icon> Data Sync successfully', "success");
    }
  }


}

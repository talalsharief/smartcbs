import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { ModalController, NavController, NavParams } from '@ionic/angular';
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
  Data;
  MeterOrFeedback = 0;
  MeterReaderID:""
  constructor(
    private modalController: ModalController,
    private global: GlobalService,
    private navController: NavController,
    public dal: DalService,
    public local: LocalstorageService,
    public toast: ToastService,
    public navparam: NavParams
  ) {
    this.Data = this.navparam.get('data');
    this.MeterOrFeedback = this.navparam.get('type');
  }

  ngOnInit(

  ) {

  }
  async btnYesSync() {
    // this.SyncMeterFeedback();
    this.SyncMeterFeedBack()
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
    this.modalController.dismiss().then(() => {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          consumerdata: JSON.stringify(this.Data)
        }
      };
      let pagename = this.MeterOrFeedback == 1 ? '/meterreading' : '/meterfeedback'
      this.navController.navigateRoot(pagename, navigationExtras)
    }
    );
    //   const modal = await this.modalController.create({
    //     component: LogPopupComponent,
    //     // cssClass: 'CustomPopUp'
    //   });
    //   return await modal.present();
  }
  Syncing() {
  }

  btnYesFetched() {
    this.global.isFetched = true;
    this.global.btnFetch = false;
    this.global.AllFetched = 0;
    this.local.get("userData").then((data) => {
      if (data) {
        this.MeterReaderID=data.MTUserID
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
            this.isFectched().then((isFetched) => {
              if (isFetched) {
                this.local.set('LastFetchDateTime', new Date().toLocaleString())
                this.SaveFetcheHistory();//Saving/Update Fetechd time and record 

              }

            })
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

  isFectched() {
    return new Promise((resolve, reject) => {
      if (this.global.AllFetched >= 2) {
        let obj={
          MeterReaderID:this.MeterReaderID
        }
        this.dal.FetchIndexConfiguration(obj).then((data:any)=>{
          if(data){
            this.global.isIndexReading=data
          }
        })

        this.global.DoneFetched = false;
        this.global.btnFetch = true;
        this.toast.ShowCustomToast('<ion-icon name="checkmark-outline"></ion-icon> Data Sync successfully', "success");
        return resolve(true);
      }
    })

  }

  SaveFetcheHistory() {
    this.local.get("DataFetch").then((d) => {
      if (d == null) {
        let tepmArr = []
        let N = []
        let obj = {
          records: this.global.AllMetersList.length,
          syncDateTime: new Date().toLocaleString()
        }
        tepmArr.push(obj)
        this.local.set("DataFetch", tepmArr);
      }
      else {
        this.local.get("DataFetch").then((data) => {
          let tepmArr = []
          tepmArr = data;
          let obj = {
            records: this.global.AllMetersList.length,
            syncDateTime: new Date().toLocaleString()
          }
          tepmArr.push(obj)

          this.local.set("DataFetch", tepmArr);

        })

      }

    })
  }


  SyncMeterFeedback() {
    let TempArray = [];
    let MeterFeedback = []
    this.local.get("userData").then((userData) => {
      if (userData) {
        // var obj = {
        //   MeterReading: MeterReading,
        //   MeterReadingUserID: M_ID,
        // };
        this.local.get("MeterFeedback").then((Feedback) => {
          if (Feedback) {
            let meter = [];
            TempArray = Feedback;
            MeterFeedback = TempArray.filter(x => x.isSend == false);
            for (let index = 0; index < MeterFeedback.length; index++) {
              meter[index] = JSON.stringify(MeterFeedback[index]);
            }
            var obj = {
              Meterfeedback: meter,
              MeterReadingUserID: userData.MTUserID,
            }
            this.dal.SyncMeterFeedback(obj).then((data) => {
              if (data) {
                console.log(data);
              }
            })
          }
        })
      }
    })
  }

  SyncMeterReading() {
    let TempArray = [];
    let MeterReading = []
    this.local.get("userData").then((userData) => {
      if (userData) {
        // var obj = {
        //   MeterReading: MeterReading,
        //   MeterReadingUserID: M_ID,
        // };
        this.local.get("MeterReading").then((Reading) => {
          if (Reading) {
            let meter = [];
            TempArray = Reading;
            MeterReading = TempArray.filter(x => x.IsSend == false);
            for (let index = 0; index < MeterReading.length; index++) {
              meter[index] = JSON.stringify(MeterReading[index]);
            }
            var obj = {
              MeterReading: meter,
              MeterReadingUserID: userData.MTUserID,
            }

            this.dal.SyncMeterReading(obj).then((data) => {
              if (data) {
                console.log(data);
              }
            })
          }
        })
      }
    })
  }

  SyncMeterFeedBack(){
    this.SyncMeterFeedback()
    this.SyncMeterReading()
  }
}

import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';
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
    public global: GlobalService,
    private navController: NavController,
    public dal: DalService,
    public local: LocalstorageService,
    public toast: ToastService,
    public navparam: NavParams,
    public loadingController: LoadingController
  
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
      console.log(this.global.UserData)
   
      if (this.global.UserData) {
        this.MeterReaderID=this.global.UserData.MTUserID
        let obj = {
          MeterReaderID: this.global.UserData.MTUserID
        }
        this.dal.FetchConsumers(obj).then((consumers) => {
          console.log(consumers)
          if (consumers) {
            // this.global.isFetched = false
            // this.global.DoneFetched = true
            console.log("Consumers list fetched")
            this.global.AllFetched++;
            console.log(this.global.AllFetched)
            this.isFectched();

          }
          else if (consumers == null) {
            console.log("Consumers list fetched failed")
          }
        });
        // this.global.isFetched = true;
        // this.global.btnFetch = false;
        this.dal.FetchMeters(obj).then(async(meters) => {
          console.log(meters)
          if (meters) {
            this.global.isFetched = false
            this.global.DoneFetched = true
            console.log("Meters list fetched")
            this.global.AllFetched++;
           await this.isFectched().then((isFetched) => {
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
        }, (error)=>{
          return reject(error)
        })

        this.global.DoneFetched = false;
        this.global.btnFetch = true;
        this.toast.ShowCustomToast('<ion-icon name="checkmark-outline"></ion-icon> Data Sync successfully', "success");
        return resolve(true);
      }
    } )

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

          this.local.set("DataFetch", tepmArr).then((data)=>console.log(data));

        })

      }

    })
  }
  SaveSyncHistory(){
    this.local.get("DataSync").then((d) => {
      if (d == null) {
        let tepmArr = []
        let N = []
        let value=  this.global.AllConsumerMeters.filter(x => x.isSend == false).length;
       
        let obj = {
          records: value,
          syncDateTime: new Date().toLocaleString()
        }
        tepmArr.push(obj)
        this.local.set("DataSync", tepmArr);
      }
      else {
        this.local.get("DataSync").then((data) => {
          let tepmArr = []
          tepmArr = data;
          let obj = {
            records: this.global.AllMeterReading.length,
            syncDateTime: new Date().toLocaleString()
          }
          tepmArr.push(obj)

          this.local.set("DataSync", tepmArr);

        })

      }

    })
  }


  SyncMeterFeedback() {
    let TempArray = [];
    let MeterFeedback = []
    this.local.get("UserData").then((userData) => {
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
              meter[index] = MeterFeedback[index];
            }
            var obj = {
              Meterfeedback: meter,
              MeterReadingUserID: userData.MTUserID,
            }
            this.dal.SyncMeterFeedback(obj).then((data : any) => {
              if (data) {
                let newarr = []
                newarr = data
                for(let  i = 0 ; i< data.length; i++){
                  let FeedBackID = this.global.AllMeterFeedback.filter(x => x.MeterId == data[i])
                  let Index = this.global.AllMeterFeedback.findIndex(x => x.MeterId == data[i])
                  for(let isSendTrue of FeedBackID){
                    isSendTrue.isSend = true
                    this.global.AllMeterFeedback.splice(Index,1,isSendTrue)
                    this.local.set("MeterFeedback",this.global.AllMeterFeedback)
                    this.local.set('LastSyncDateTime', new Date().toLocaleString())
                    this.SaveSyncHistory()
                   
                    // this.global.local.set("Meters",this.global.AllMetersList)
                  }
  
                  } 
                this.local.set('LastSyncDateTime', new Date().toLocaleString())
                this.SaveSyncHistory()
                console.log(data);
              }
            })
          }
        })
      }
    })
  }

  SyncMeterReading() {
    this.presentLoading()
    let TempArray = [];
    let MeterReading = []
    this.local.get("UserData").then((userData) => {
      if (userData) {
        // var obj = {
        //   MeterReading: MeterReading,
        //   MeterReadingUserID: M_ID,
        // };
        this.local.get("MeterReading").then((Reading) => {
          if (Reading) {
            let meter = [];
            TempArray = Reading;
            MeterReading = TempArray.filter(x => x.isSend == false);
            for (let index = 0; index < MeterReading.length; index++) {
              meter[index] = MeterReading[index];
            }
            var obj = {
              lstMeterReading: meter,
              MeterReadingUserID: userData.MTUserID,
            }

            this.dal.SyncMeterReading(obj).then((data : any) => {
              if (data) {
                let newarr = []
                newarr = data
                for(let  i = 0 ; i< data.length; i++){
                  let MeterID = this.global.AllMeterReading.filter(x => x.MeterId == data[i])
                  let Index = this.global.AllMeterReading.findIndex(x => x.MeterId == data[i])
                  for(let isSendTrue of MeterID){
                    isSendTrue.isSend = true
                    this.global.AllMeterReading.splice(Index,1,isSendTrue)
                    this.local.set("MeterReading",this.global.AllMeterReading)
                    this.local.set('LastSyncDateTime', new Date().toLocaleString())
                    this.SaveSyncHistory()
                   
                    // this.global.local.set("Meters",this.global.AllMetersList)
                  }
  
                  } 
                this.local.set('LastSyncDateTime', new Date().toLocaleString())
                this.SaveSyncHistory()
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


  btnYesClear(){
    this.local.remove("LastSerial")
    this.local.remove("MeterReading")
    this.local.remove("LastSyncDateTime")
    this.local.remove("MeterFeedback")
    this.local.remove("LastFetchDateTime")
    this.local.remove("DataFetch")
    this.local.remove("DataSync")
    this.local.remove("Meters")
    this.local.remove("Consumers")
    this.local.remove("Status")
    this.local.remove("Index")
    this.navController.navigateRoot("home")
    this.modalController.dismiss()
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 8000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}
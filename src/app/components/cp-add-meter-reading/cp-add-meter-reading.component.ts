import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { IonList, NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-cp-add-meter-reading',
  templateUrl: './cp-add-meter-reading.component.html',
  styleUrls: ['./cp-add-meter-reading.component.scss'],
})
export class CpAddMeterReadingComponent implements OnInit {
  @ViewChild('sList') sList: IonList;
  isKeyboardHide = true;

  meterReading = {
    MeterReadingID: "",
    MeterID: "2",
    MeterNo: "",
    PreviousReading: "232",
    CurrentReading: "",
    cload: "",
    consumerName: "",
    consumerNo: "2332",
    consumerID: "3434",
    branchid: "122",
    imageUrl: "",
    ReadingDate: "",
    SerialNo: ""

  }
  constructor(public keyboard: Keyboard,
    public toast: ToastService,
    public local: LocalstorageService,
    public nav: NavController,
    public global: GlobalService
  ) {
    this.isKeyboardHide = true;
    this.meterReading.ReadingDate = new Date().toLocaleDateString();
    this.FetchAllConsumerMeters();
  }

  ngOnInit() {
    // this.sList.closeSlidingItems()
  }
  ionViewWillEnter() {
    alert("Entered");
    this.FetchAllConsumerMeters();
    this.keyboard.onKeyboardWillShow().subscribe(() => {
      this.isKeyboardHide = false;
      // console.log('SHOWK');
    });

    this.keyboard.onKeyboardWillHide().subscribe(() => {
      this.isKeyboardHide = true;
      // console.log('HIDEK');
    });
  }

  // addMeterReading(){
  //   if(this.meterReading.CurrentReading==""){
  //    this.toast.ShowCustomToast('<ion-icon name="alert-circle"></ion-icon> Enter current meter reading' , "error" );
  //   }
  //   else
  //   {
  //     let obj={
  //       BranchID: this.meterReading.branchid,
  //       Cload: this.meterReading.cload,
  //       ConsumerID: this.meterReading.consumerID,
  //       ConsumerName: this.meterReading.consumerName,
  //       CurrentReadig: this.meterReading.CurrentReading,
  //       ID: this.global.GetPrimaryKey(),
  //       MeterId: this.meterReading.MeterID,
  //       MeterNo: this.meterReading.MeterNo,
  //       MeterReadingUserID: this.meterReading.branchid,
  //       SerialNo: this.meterReading.SerialNo,
  //       imageUrl: this.meterReading.imageUrl,
  //       _date: this.meterReading.ReadingDate,
  //       ImageSync: "false",
  //       IsSend: "false"
  //     }
  //     this.local.get("MeterReading").then((reading:any)=>{
  //       if(reading){
  //         let newResArr=[] 
  //         newResArr = reading
  //         newResArr.push(obj);
  //                this.local.set("MeterReading",newResArr).then((result)=>{
  //         this.toast.ShowCustomToast('<ion-icon name="checkmark-outline"></ion-icon> Meter reading saved' , "success" );
  //         this.nav.navigateRoot("log");
  //          });
  //       }
  //       else if(reading==null){
  //         let aRRay=[]
  //       aRRay.push(obj)
  //           this.local.set("MeterReading",aRRay).then((result)=>{
  //             this.toast.ShowCustomToast('<ion-icon name="checkmark-outline"></ion-icon> Meter reading saved' , "success" );
  //             this.nav.navigateRoot("log");

  //              });
  //       }

  //     })


  //   }
  // }
  FetchAllConsumerMeters() {
    this.global.getAllConsumerMeters();
  }

  LoadMoreData(evt) {
    if (this.global.ScrollArrayCount < this.global.AllFilterSearch.length) {
      let start = this.global.ScrollArrayCount;
      this.global.ScrollArrayCount += 20
      for (var i = start; i < this.global.ScrollArrayCount; i++) {
        if (i === this.global.AllFilterSearch.length) {
          break;
        }
        else {
          this.global.FilterSearchShow.push(this.global.AllFilterSearch[i]);
        }
      }
      evt.target.complete();

    }

  }

  goto_MeterReading(data) {

    if (data != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          consumerdata: JSON.stringify(data)
        }
      };
      this.nav.navigateForward(['meterreading'], navigationExtras);
    }

  }

  goto_MeterFeedback(data) {

    if (data != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          consumerdata: JSON.stringify(data)
        }
      };
      this.nav.navigateForward(['meterfeedback'], navigationExtras);
    }

  }

  ngOnDestroy(): void {

  }

  RemainingMeterReadingCount() {
    let count = this.global.AllConsumerMeters.filter(x => x.IsReadingAdded == false && x.IsFeedbackAdded == false).length;
    if (count) {
      return count;
    }
  }





}

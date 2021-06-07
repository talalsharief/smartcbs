import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-cp-meter-reading',
  templateUrl: './cp-meter-reading.component.html',
  styleUrls: ['./cp-meter-reading.component.scss'],
})
export class CpMeterReadingComponent implements OnInit {

  MeterReadingData;
  meterReading = {
    ConsumerID: -1,
    ConsumerName: "",
    ConsumerNo: "",
    IsFeedbackAdded: false,
    IsReadingAdded: false,
    MeterID: 0,
    MeterNo: "",
    Name: "",
    PreviousReading: 0,
    SerialNo: "",
    SuppMeterNo: "",
    CurrentReading: "",
    ImageSync: "",
    imageUrl: "",
    BranchID: "",
    Cload: "",
    MeterReadingUserID: "",
    ID: "",
    _date: ""
  }

  CurrentReading: ""
  imageUrl: ""
  ReadingDate: string
  constructor(
    public route: ActivatedRoute,
    public local: LocalstorageService,
    public toast: ToastService,
    public nav: NavController,
    public global: GlobalService
  ) {
    this.ReadingDate = new Date().toLocaleDateString();
    this.setInputFocus();
    this.route.queryParams.subscribe(params => {
      this.meterReading = JSON.parse(params["consumerdata"]);
      this.local.get("userData").then((data) => {
        console.log(this.meterReading);
        this.meterReading.BranchID = data.BranchID,
          this.meterReading.MeterReadingUserID = data.MTUserID
      })
    });
  }

  ngOnInit(

  ) {

  }

  setInputFocus() {
    window.setTimeout(function () {
      document.getElementById('inputFocus').focus();
    }, 0);
  }

  addMeterReading() {
    if (this.CurrentReading == "" || this.CurrentReading == undefined) {
      this.toast.ShowCustomToast('<ion-icon name="alert-circle"></ion-icon> Enter current meter reading', "error");
    }
    else {
      let obj = {
        BranchID: this.meterReading.BranchID,
        Cload: "0",
        ConsumerID: this.meterReading.ConsumerID,
        ConsumerName: this.meterReading.ConsumerName,
        CurrentReadig: this.CurrentReading,
        ID: this.global.GetPrimaryKey(),
        MeterId: this.meterReading.MeterID,
        MeterNo: this.meterReading.MeterNo,
        MeterReadingUserID: this.meterReading.MeterReadingUserID,
        SerialNo: this.meterReading.SerialNo,
        imageUrl: "",
        _date: this.ReadingDate,
        ImageSync: false,
        IsSend: false,
        Type: "mr"
      }
      this.global.AllMeterReading.push(obj);
      this.local.set("MeterReading", this.global.AllMeterReading).then((data) => {
        let index = this.global.AllConsumerMeters.findIndex(x => x.MeterNo == this.meterReading.MeterNo);
        if (index >= 0)
          this.global.AllConsumerMeters[index].IsReadingAdded = true;
        this.toast.ShowCustomToast('<ion-icon name="checkmark-outline"></ion-icon> Meter reading saved', "success");
      })
      // this.local.get("MeterReading").then((reading: any) => {
      //   if (reading) {
      //     let newResArr = []
      //     newResArr = reading
      //     newResArr.push(obj);
      //     this.local.set("MeterReading", newResArr).then((result) => {

      //       // this.nav.navigateRoot("log");
      //     });
      //   }
      //   else if (reading == null) {
      //     let aRRay = []
      //     aRRay.push(obj)
      //     this.local.set("MeterReading", aRRay).then((result) => {
      //       let index = this.global.AllConsumerMeters.findIndex(x => x.MeterNo == this.meterReading.MeterNo);
      //       let Value = this.global.AllConsumerMeters.filter(x => x.MeterNo == this.meterReading.MeterNo);
      //       // Value[0].IsReadingAdded=true;
      //       // this.global.AllConsumerMeters.splice(index, 0, Value)[0];
      //       // this.global.AllConsumerMeters.join();
      //       this.toast.ShowCustomToast('<ion-icon name="checkmark-outline"></ion-icon> Meter reading saved', "success");
      //       // this.nav.navigateRoot("log"); 
      //     });
      //   }

      // })


    }
  }
}

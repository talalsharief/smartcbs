import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-cp-meter-feedback',
  templateUrl: './cp-meter-feedback.component.html',
  styleUrls: ['./cp-meter-feedback.component.scss'],
})
export class CpMeterFeedbackComponent implements OnInit {
  meterFeedback = {
    FeedbackId: "",
    MeterNumber: "",
    comments: "",
    status: "",
    _date: "",
    colorcode: "",
    isSend: "",
    MeterId: "",
    SerialNo: ""
  }
  ConsumerData: any;
  constructor(
    public route: ActivatedRoute,
    public local: LocalstorageService,
    public toast: ToastService,
    public nav: NavController,
    public global: GlobalService
  ) {
    this.meterFeedback.status = "Faulty";
    this.route.queryParams.subscribe(params => {
      this.ConsumerData = JSON.parse(params["consumerdata"]);
      this.local.get("userData").then((data) => {
      })
    });
  }

  ngOnInit() { }


  addMeterFeedback() {
    if (this.meterFeedback.status == "" || this.meterFeedback.status == undefined || this.meterFeedback.comments == "" || this.meterFeedback.comments == undefined) {
      this.toast.ShowCustomToast('<ion-icon name="alert-circle"></ion-icon> Please Fill All Field', "error");
    }
    else {
      let obj = {
        FeedbackId: this.global.GetPrimaryKey(),
        MeterNumber: this.ConsumerData.MeterNo,
        comments: this.meterFeedback.comments,
        status: this.meterFeedback.status,
        _date: new Date().toLocaleDateString(),
        colorcode: "",
        isSend: false,
        MeterId: this.ConsumerData.MeterID,
        SerialNo: "",
        Type:"mf"
      }
      this.local.get("MeterFeedback").then((reading: any) => {
        if (reading) {
          let newResArr = []
          newResArr = reading
          newResArr.push(obj);
          this.local.set("MeterFeedback", newResArr).then((result) => {
            // let index = this.global.AllConsumerMeters.findIndex(x => x.MeterNo == this.meterReading.MeterNo);
            // let Value = this.global.AllConsumerMeters.filter(x => x.MeterNo == this.meterReading.MeterNo);

            // Value[0].IsReadingAdded=true;
            // this.global.AllConsumerMeters[index] = value;
            // this.global.AllConsumerMeters.join();
            this.toast.ShowCustomToast('<ion-icon name="checkmark-outline"></ion-icon> Meter feedback saved', "success");
            // this.nav.navigateRoot("log");
          });
        }
        else if (reading == null) {
          let aRRay = []
          aRRay.push(obj)
          this.local.set("MeterFeedback", aRRay).then((result) => {
            // let index = this.global.AllConsumerMeters.findIndex(x => x.MeterNo == this.meterReading.MeterNo);
            // let Value = this.global.AllConsumerMeters.filter(x => x.MeterNo == this.meterReading.MeterNo);
            // Value[0].IsReadingAdded=true;
            // this.global.AllConsumerMeters.splice(index, 0, Value)[0];
            // this.global.AllConsumerMeters.join();
            this.toast.ShowCustomToast('<ion-icon name="checkmark-outline"></ion-icon> Meter feedback saved', "success");
            // this.nav.navigateRoot("log"); 
          });
        }
      })


    }
  }



}

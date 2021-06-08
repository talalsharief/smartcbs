import { Component, Input, OnInit } from '@angular/core';
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
  // @Input("data") data
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
    // console.log(this.data);
    this.meterFeedback.status = "Faulty";
    this.route.queryParams.subscribe(params => {
      this.ConsumerData = JSON.parse(params["consumerdata"]);
      if (this.ConsumerData != undefined) {
        this.meterFeedback.FeedbackId=this.ConsumerData.FeedbackId
        this.meterFeedback.comments = this.ConsumerData.comments,
          this.meterFeedback.status = this.ConsumerData.status
      }
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
        FeedbackId: this.meterFeedback.FeedbackId === "" ? this.global.GetPrimaryKey() : this.meterFeedback.FeedbackId,
        MeterNumber: this.meterFeedback.MeterNumber === "" ? this.ConsumerData.MeterNo : this.meterFeedback.MeterNumber,
        comments: this.meterFeedback.comments,
        status: this.meterFeedback.status,
        _date: new Date().toLocaleDateString(),
        colorcode: "",
        isSend: false,
        MeterId: this.meterFeedback.MeterId === "" ? this.ConsumerData.MeterID:"",
        SerialNo: "",
        Type: "mf"
      }
      if (this.meterFeedback.FeedbackId === "") {
        this.global.AllMeterFeedback.push(obj);
        this.local.set("MeterFeedback", this.global.AllMeterFeedback).then((data) => {
          let index = this.global.AllConsumerMeters.findIndex(x => x.MeterNo == this.meterFeedback.MeterNumber);
          if (index >= 0)
            this.global.AllConsumerMeters[index].IsFeedbackAdded = true;
          this.toast.ShowCustomToast('<ion-icon name="checkmark-outline"></ion-icon> Meter feedback saved', "success");
        })
      }
      else {
        this.local.get("MeterFeedback").then((reading: any) => {
          if (reading) {
            let newResArr = []
            newResArr = reading
            let index = newResArr.findIndex(x => x.FeedbackId == this.meterFeedback.FeedbackId);
            let Value = newResArr.filter(x => x.FeedbackId == this.meterFeedback.FeedbackId);
            newResArr[index] = obj;
            this.local.set("MeterFeedback", newResArr)
            // this.global.AllConsumerMeters.join();
            this.toast.ShowCustomToast('<ion-icon name="checkmark-outline"></ion-icon> Meter feedback Updated', "success");
            // this.nav.navigateRoot("log");
            this.global.GetDataFromLocal();
            this.global.getAllConsumerMeters();
            

          }
        })
      }
    }

  }
}

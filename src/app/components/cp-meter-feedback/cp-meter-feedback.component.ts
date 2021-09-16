import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DalService } from 'src/app/services/dal.service';
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
  StatusList = []
  ConsumerData: any;
  LastSerialNo: any;
  isMeterIndex: any;
  isMeterIndexChecked = false;

  constructor(
    public route: ActivatedRoute,
    public local: LocalstorageService,
    public toast: ToastService,
    public nav: NavController,
    public global: GlobalService,
    public dal: DalService
  ) {
    
    // this.FetchStatusList().then((data)=>{
    //   this.meterFeedback.status = this.meterFeedback.FeedbackId == "" ? this.StatusList[0].StatusName : this.ConsumerData.status
    
    // });
    // console.log(this.data);
    this.meterFeedback.status = "Faulty";
    this.route.queryParams.subscribe(params => {
      this.ConsumerData = JSON.parse(params["consumerdata"]);
      if (this.ConsumerData != undefined) {
        this.meterFeedback.FeedbackId = this.ConsumerData.FeedbackId
        this.meterFeedback.comments = this.ConsumerData.comments

      }
      this.local.get("userData").then((data) => {
        console.log()
      })

      
      this.local.get("Index").then((index) => {
        if (index != undefined) {
          this.isMeterIndex = index;
        }
      })
      this.local.get("LastSerial").then((index) => {
        if (index != undefined || index != null) {
          this.LastSerialNo = index;
        }
        else {
          this.LastSerialNo = 0;
        }
      })

    });
    console.log("Meter FeedBack Component")
  }

  ngOnInit() { 
    setTimeout(()=>{
      this.global.getAllConsumerMeters()
    },1000)
  }


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
        MeterId: this.meterFeedback.MeterId === "" ? this.ConsumerData.MeterID : "",
        SerialNo: this.meterFeedback.SerialNo,
        Type: "mf"
      }
      if (this.meterFeedback.FeedbackId === "") {
        var SerialNo = 0;
        if (this.isMeterIndexChecked && this.isMeterIndex) {
          this.local.get("LastSerial").then((last) => {

            if (last != "undefined" && last != null && last != "") {
              SerialNo = (last * 1) + 1 * 1;
            }
            else {
              SerialNo = 1;
            }
            obj.SerialNo=SerialNo.toString()
            this.local.set("LastSerial",SerialNo);
            this.global.AllMeterFeedback.push(obj);
            this.local.set("MeterFeedback", this.global.AllMeterFeedback).then((data) => {
              let index = this.global.AllConsumerMeters.findIndex(x => x.MeterNo == this.meterFeedback.MeterNumber);
              if (index >= 0)
                this.global.AllConsumerMeters[index].IsFeedbackAdded = true;
              this.toast.ShowCustomToast('<ion-icon name="checkmark-outline"></ion-icon> Meter feedback saved', "success");
              // this.ClearData();
              this.nav.navigateRoot("addmeterreading");
              this.global.getAllConsumerMeters();
            })
          })
        }
        else {

          this.global.AllMeterFeedback.push(obj);
          this.local.set("MeterFeedback", this.global.AllMeterFeedback).then((data) => {
            let index = this.global.AllConsumerMeters.findIndex(x => x.MeterNo == this.meterFeedback.MeterNumber);
            if (index >= 0)
              this.global.AllConsumerMeters[index].IsFeedbackAdded = true;
            this.toast.ShowCustomToast('<ion-icon name="checkmark-outline"></ion-icon> Meter feedback saved', "success");
            // this.ClearData();
            this.nav.navigateRoot("addmeterreading");
            this.global.getAllConsumerMeters();
          })
 

        }

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
            this.ClearData();
             this.nav.navigateRoot("addmeterreading");
            this.global.getAllConsumerMeters();


          }
        })
      }
    }

  }


  FetchStatusList(param) {
    return new Promise((resolve,reject)=>{
      this.dal.FetchStatus(param).then((data: any) => {
        if (data) {
          this.StatusList=data;
          return resolve(data);
        }
      })
    })
   
  }

  ClearData() {
    this.meterFeedback = {
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
  }

  onChange(evt){
    let value = evt.detail.checked;
    this.isMeterIndexChecked = value;
  }
}

import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ClasDeviceInfo } from '../classes/clas-device-info';
import { ClsUserData } from '../classes/cls-user-data';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public objUserData: ClsUserData;
  public objDeviceInfo: ClasDeviceInfo;

  IsSync: boolean = false;
  IsEdit: boolean = false;
  isSyncing: boolean = false;
  isFetch: boolean = false;
  btnSync: boolean = true;
  btnFetch: boolean = true;
  isFetched: boolean = false;
  DoneFetched: boolean = false;
  DoneSync: boolean = false;
  isSearch: boolean = false;

  UserData: {
    BranchID: "",
    MTUserID: "",
    branchName: "",
    userName: ""
  }

  AllMetersList = [];
  AllConsumersList = [];
  AllMeterReading = [];
  AllMeterFeedback = [];

  AllFetched = 0;

  //These variables used in searching
  AllConsumerMeters = [];
  AllFilterSearch = [];
  FilterSearchShow = []
  ScrollArrayCount = 0;

  MeterReadingList=[]
  AllFilterMeterReading = [];



  constructor(public local: LocalstorageService) {
    this.objUserData = new ClsUserData();
  }
  getDeviceInfo() {
    let id;
    let info = window.navigator;
    if (this.objUserData == undefined) {
      id = ""
    }
    else {
      id = this.objUserData.userData.id
    }
    this.objDeviceInfo.deviceinfo = {
      appversion: info.appVersion,
      deviceversion: info.appCodeName,
      platform: info.platform,
      userid: id
    }
    return this.objDeviceInfo.deviceinfo;
  }

  getAllConsumerMeters() {
    this.AllConsumerMeters = []
    for (let index = 0; index < this.AllConsumersList.length; index++) {
      let CMeters = this.AllMetersList.filter(items => items.ConsumerID == this.AllConsumersList[index].ConsumerID);
      for (let j = 0; j < CMeters.length; j++) {

        //Checking Reading
        let FindMR = this.AllMeterReading.find(items => items.MeterId == CMeters[j].MeterID);
        let MRValue = FindMR != undefined;

        //Checking Feedback
        let FindFeedback = this.AllMeterFeedback.find(items => items.MeterId == CMeters[j].MeterID);
        let FeedbackValue = FindFeedback != undefined;
        let _date:"";
        let FeedbackId:"";
        let ID:"";
        let comments:''
        let isSend:""
        if(FeedbackValue==true){
          _date=FindFeedback._date,
          FeedbackId=FindFeedback.FeedbackId
          comments=FindFeedback.comments,
          isSend=FindFeedback.isSend
        }
        else if(MRValue==true){
          _date=FindMR._date,
          ID=FindMR.ID,
          isSend=FindMR.isSend
        }
        else{_date=""}
        // if (MRValue === false && FeedbackValue === false)
        this.AllConsumerMeters.push({
          Name: this.AllConsumersList[index].ConsumerName + " " + CMeters[j].MeterNo + " " + CMeters[j].SuppMeterNo + " " + this.AllConsumersList[index].ConsumerNo,
          MeterID: CMeters[j].MeterID,
          ConsumerID: this.AllConsumersList[index].ConsumerID, 
          IsReadingAdded: MRValue, 
          SerialNo: CMeters[j].SerialNo, 
          IsFeedbackAdded: FeedbackValue, 
          ConsumerName: this.AllConsumersList[index].ConsumerName, 
          MeterNo: CMeters[j].MeterNo, 
          ConsumerNo: this.AllConsumersList[index].ConsumerNo, 
          SuppMeterNo: CMeters[j].SuppMeterNo, 
          PreviousReading: CMeters[j].PreviousReading,
          _date:_date,
          CurrentReading:MRValue==true?FindMR.CurrentReadig:0,
          status:FeedbackValue==true?FindFeedback.status:"",
          ID:MRValue==true?ID:"",
          FeedbackId:FeedbackValue==true?FeedbackId:"",
          comments:FeedbackValue==true?comments:"",
          isSend:isSend
          
        });
      }
    }
    console.log("all consumermeterslist filled");
  }

  GetPrimaryKey() {
    let id = "";
    let possible = "0123456789" + Date.now().toString().substring(7, 13);
    for (let i = 0; i < 6; i++) {
      id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return id;
  }

  GetDataFromLocal() {
    this.AllConsumersList = []
    this.AllMetersList = []
    this.AllMeterReading = [];
    this.AllMeterFeedback = [];

    this.local.get("Consumers").then((data) => {
      if (data) {
        this.AllConsumersList = data;
      }
    })
    this.local.get("Meters").then((data) => {
      if (data) {
        this.AllMetersList = data;
      }
    })
    this.local.get("MeterReading").then((data) => {
      if (data) {
        this.AllMeterReading = data;
      }
    })
    this.local.get("MeterFeedback").then((data) => {
      if (data) {
        this.AllMeterFeedback = data;
      }
    })

    this.getAllConsumerMeters();
  }

  GetRelativeTime(datetime){
   return moment(datetime,'MM/DD/YYYY, h:mm:ss A').fromNow()
  }
}

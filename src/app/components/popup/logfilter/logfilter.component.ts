import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-logfilter',
  templateUrl: './logfilter.component.html',
  styleUrls: ['./logfilter.component.scss'],
})
export class LogfilterComponent implements OnInit {
  isShown: boolean = false;
  TodayDate = new Date().toDateString()
  today
  constructor(
    private modalCtrl: ModalController
  ) { 

  }

  ngOnInit() {
    this.GetTodayDate()

   }
  modalDismiss() {
    this.modalCtrl.dismiss();
  }

  btnFilter() {
    this.isShown = !this.isShown;
  }
  GetTodayDate() {
    var today = new Date();
   (<HTMLInputElement> document.getElementById("date")).value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

  }

}

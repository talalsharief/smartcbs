import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-log-popup',
  templateUrl: './log-popup.component.html',
  styleUrls: ['./log-popup.component.scss'],
})
export class LogPopupComponent implements OnInit {

  constructor(
    private nav:NavController,private modalCtrl:ModalController
  ) { }

  ngOnInit() {}
  modalDismiss(){
    this.modalCtrl.dismiss();
  }
}

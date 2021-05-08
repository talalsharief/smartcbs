import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-logfilter',
  templateUrl: './logfilter.component.html',
  styleUrls: ['./logfilter.component.scss'],
})
export class LogfilterComponent implements OnInit {

  constructor(
    private modalCtrl : ModalController
  ) { }

  ngOnInit() {}
  modalDismiss(){
    this.modalCtrl.dismiss();
  }
}

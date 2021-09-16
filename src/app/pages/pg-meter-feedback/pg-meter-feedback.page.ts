import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-pg-meter-feedback',
  templateUrl: './pg-meter-feedback.page.html',
  styleUrls: ['./pg-meter-feedback.page.scss'],
})
export class PgMeterFeedbackPage implements OnInit {

  constructor(public global:GlobalService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.global.GetDataFromLocal()
    this.global.getAllConsumerMeters()
  }
}

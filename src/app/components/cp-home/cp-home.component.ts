import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-cp-home',
  templateUrl: './cp-home.component.html',
  styleUrls: ['./cp-home.component.scss'],
})
export class CpHomeComponent implements OnInit {

  TodayDate= new Date().toDateString()

  constructor(
    public global:GlobalService,
  ) {

   }

  ngOnInit() {}

}

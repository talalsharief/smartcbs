import { Component } from '@angular/core';
import { DalService } from './services/dal.service';
import { GlobalService } from './services/global.service';
import { LocalstorageService } from './services/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent {
  CustomToastText = "invalid"

  constructor(
    public dal: DalService,
    public global: GlobalService
  ) {
    this.global.GetDataFromLocal();
  }



}

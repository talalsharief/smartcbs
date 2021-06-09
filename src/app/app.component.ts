import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CpMeterReadingComponent } from './components/cp-meter-reading/cp-meter-reading.component';
import { ApiService } from './services/api.service';
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
    public global: GlobalService,
    public api:ApiService,
    public nav:NavController
  ) {

    this.dal.authState.subscribe(state => {
      if (state) {
        if (this.global.UserData.MTUserID) {
              this.nav.navigateRoot('home');
              this.global.GetDataFromLocal();
        }
    }
    else {

      this.nav.navigateRoot(['login']);
    }
    });

  }

  GetData(){
 
  }


}

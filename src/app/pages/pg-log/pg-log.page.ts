import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LogPopupComponent } from 'src/app/components/popup/log-popup/log-popup.component';
import { LogfilterComponent } from 'src/app/components/popup/logfilter/logfilter.component';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-pg-log',
  templateUrl: './pg-log.page.html',
  styleUrls: ['./pg-log.page.scss'],
})
export class PgLogPage implements OnInit {

  constructor(
    private modalController : ModalController,
    public global :GlobalService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.global.GetDataFromLocal()
    this.global.getAllConsumerMeters()
  }
  async btnShowLog(){
    
    const modal = await this.modalController.create({
      component: LogfilterComponent,
      // cssClass: 'CustomPopUp'
    });
    return await modal.present();
    
  }
  btnSearch(){
    this.global.isSearch =true
  }
  btnClose(){
    this.global.isSearch = false
  }

  async SearchLog(evt) {
    this.global.MeterReadingList= this.global.AllFilterMeterReading
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      return;
    }
    this.global.MeterReadingList = this.global.MeterReadingList.filter(item => {
      if (item.Name && searchTerm) {
        return (item.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }
}

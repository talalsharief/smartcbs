import { Component, OnInit } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-pg-add-meter-reading',
  templateUrl: './pg-add-meter-reading.page.html',
  styleUrls: ['./pg-add-meter-reading.page.scss'],
})
export class PgAddMeterReadingPage implements OnInit {

  isKeyboardHide=true;
  constructor(public keyboard:Keyboard,
    public global:GlobalService
    ) { 
    this.isKeyboardHide=true;
  }
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.keyboard.onKeyboardWillShow().subscribe(()=>{
      this.isKeyboardHide=false;
      // console.log('SHOWK');
    });

    this.keyboard.onKeyboardWillHide().subscribe(()=>{
      this.isKeyboardHide=true;
      // console.log('HIDEK');
    });
  }
    async SearchConsumerMeter(evt) {
      this.global.AllFilterSearch = this.global.AllConsumerMeters.filter(x=>x.IsReadingAdded==false && x.IsFeedbackAdded==false);
      const searchTerm = evt.srcElement.value;
      if (!searchTerm) {
        return;
      }
      this.global.AllFilterSearch = this.global.AllFilterSearch.filter(item=> {
        if (item.Name && searchTerm) {
            return (item.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);   
        }
      });
      console.log("All Filter Search Found length: "+ this.global.AllFilterSearch.length);
      if(searchTerm !=""){
        this.global.FilterSearchShow=this.global.AllFilterSearch.slice(0, 20);
        this.global.ScrollArrayCount=this.global.FilterSearchShow.length;
      }
     
  }
}

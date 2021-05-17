import { Component, OnInit } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-pg-add-meter-reading',
  templateUrl: './pg-add-meter-reading.page.html',
  styleUrls: ['./pg-add-meter-reading.page.scss'],
})
export class PgAddMeterReadingPage implements OnInit {

  isKeyboardHide=true;
  constructor(public keyboard:Keyboard) { 
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
}

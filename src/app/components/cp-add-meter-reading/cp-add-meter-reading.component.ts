import { Component, OnInit, ViewChild } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { IonList } from '@ionic/angular';

@Component({
  selector: 'app-cp-add-meter-reading',
  templateUrl: './cp-add-meter-reading.component.html',
  styleUrls: ['./cp-add-meter-reading.component.scss'],
})
export class CpAddMeterReadingComponent implements OnInit {
  @ViewChild('sList') sList : IonList;

  isKeyboardHide=true;

  constructor(public keyboard:Keyboard) { 
    this.isKeyboardHide=true;
  }

  ngOnInit() {
    // this.sList.closeSlidingItems()
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

import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-log-popup',
  templateUrl: './log-popup.component.html',
  styleUrls: ['./log-popup.component.scss'],
})
export class LogPopupComponent implements OnInit {

  TodayDate= new Date().toDateString();
  CurrentTime 
  constructor(
    private nav:NavController,private modalCtrl:ModalController,
    
  ) {
    this.GetCurentTime(new Date())
   }

  ngOnInit() {
    this.setInputFocus()
   
  }
  modalDismiss(){
    this.modalCtrl.dismiss();
  }
  setFocusOninput(){
    document.getElementById("inputF").focus();
    
  }
  GetCurentTime(date){
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    this.CurrentTime = hours + ':' + minutes + ' ' + ampm;
    console.log(this.CurrentTime)
    // return strTime;
  }
  setInputFocus(){
    window.setTimeout(function () { 
      document.getElementById('inputFocus1').focus(); 
  }, 0); 
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cp-meter-reading',
  templateUrl: './cp-meter-reading.component.html',
  styleUrls: ['./cp-meter-reading.component.scss'],
})
export class CpMeterReadingComponent implements OnInit {

  constructor() {
    this.setInputFocus()
   }

  ngOnInit(
    
  ) {
  
  }

  setInputFocus(){
    window.setTimeout(function () { 
      document.getElementById('inputFocus').focus(); 
  }, 0); 
  }
}

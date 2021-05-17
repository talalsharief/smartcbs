import { Component, OnInit } from '@angular/core';
// import * as introJs from 'intro.js/intro.js';
@Component({
  selector: 'app-pg-login',
  templateUrl: './pg-login.page.html',
  styleUrls: ['./pg-login.page.scss'],
})
export class PgLoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.showHelp()
  }
  showHelp(){
    // introJs(document.querySelector("app-pg-login")).setOptions({
    //   'nextLabel': 'Next step',
    //   'prevLabel': 'Previous step',
    //   'skipLabel': 'Don\'t bother me!',
    //   'doneLabel': 'Finish'
    // }).start(); 
  }
}

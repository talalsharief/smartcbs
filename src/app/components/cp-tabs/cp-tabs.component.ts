import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cp-tabs',
  templateUrl: './cp-tabs.component.html',
  styleUrls: ['./cp-tabs.component.scss'],
})
export class CpTabsComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  ionViewDidEnter() {
    document.querySelector('#tab-button-tab3').shadowRoot.querySelector('.button-native').setAttribute('style', 'margin-top: -2px');
  }
}

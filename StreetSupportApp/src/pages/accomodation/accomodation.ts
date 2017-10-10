import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {STRINGS} from "../../constants";


@Component({
  selector: 'accomodation',
  templateUrl: 'accomodation.html'
})
export class AccomodationPage {

  public content: string;

  constructor(public nav: NavController, navParams: NavParams, private iab: InAppBrowser) {
    this.content = STRINGS['ACCOMODATION_COPY'];
  }

  presentWebPage() {
    let browser = this.iab.create('https://streetsupport.net/find-help/accommodation/', '_system','');
    browser.show();
  }
}

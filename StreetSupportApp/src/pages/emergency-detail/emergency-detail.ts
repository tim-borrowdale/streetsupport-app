import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { STRINGS } from "../../constants";


@Component({
  selector: 'emergency-detail',
  templateUrl: 'emergency-detail.html'
})
export class EmergencyDetailPage {

  public content: string;
  public url: string;
  public linkText: string;

  constructor(public nav: NavController, navParams: NavParams, private iab: InAppBrowser) {
    const contentId = navParams.get('contentId');
    this.url = navParams.get('url');
    this.content = STRINGS[contentId];
    this.linkText = navParams.get('linkText');
  }

  showWebPage() {
    this.iab.create(this.url, '_system', '');
  }
}

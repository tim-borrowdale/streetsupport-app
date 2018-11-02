import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public nav: NavController, private iab: InAppBrowser) {
  }

  launch(url) {
    this.iab.create(url, '_system');
  }
}

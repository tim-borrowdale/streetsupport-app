import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public nav: NavController, private iab: InAppBrowser) {
  }

  launch(url) {
    this.iab.create(url, '_system');
  }
}

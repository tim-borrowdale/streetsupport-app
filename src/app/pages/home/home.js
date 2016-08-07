import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {EmergencyPage} from '../emergency/emergency';


@Component({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {
  static get parameters() {
    return [[NavController], [Platform]];
  }

  constructor(nav, platform) {
    this.nav = nav;
    this.platform = platform;
  }

  launch(url) {
    this.platform.ready().then(() => {
      cordova.InAppBrowser.open(url, "_blank", "location=no,toolbarposition=top");
    });
  }

  emergencyItemTapped(event) {
    this.nav.push(EmergencyPage);
  }

  servicesItemTapped(event) {
    this.nav.parent.select(1);
  }
}

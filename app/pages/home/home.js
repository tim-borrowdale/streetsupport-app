import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {EmergencyPage} from '../emergency/emergency';

/*
  Generated class for the HomePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav, platform) {
    this.nav = nav;
  }

  launch(url) {
    cordova.InAppBrowser.open(url, "_blank", "location=no,toolbarposition=top");
  }

  emergencyItemTapped(event) {
    this.nav.push(EmergencyPage);
  }
}

import {Component} from '@angular/core';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {NavController} from 'ionic-angular';
import {EmergencyPage} from '../emergency/emergency';


@Component({
  selector: 'home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public nav: NavController, private iab: InAppBrowser) { }

  launch(url) {
    const browser = this.iab.create(url, '_system');
  }

  emergencyItemTapped() {
    this.nav.push(EmergencyPage);
  }

  servicesItemTapped() {
    this.nav.parent.select(1);
  }
}

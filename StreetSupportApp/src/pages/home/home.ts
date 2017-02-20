import {Component} from '@angular/core';
import {InAppBrowser} from 'ionic-native';
import {NavController} from 'ionic-angular';
import {EmergencyPage} from '../emergency/emergency';


@Component({
  selector: 'home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public nav: NavController) { }

  launch(url) {
    new InAppBrowser(url, "_system");
  }

  emergencyItemTapped() {
    this.nav.push(EmergencyPage);
  }

  servicesItemTapped() {
    this.nav.parent.select(1);
  }
}

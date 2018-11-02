import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NavController } from 'ionic-angular';
import { EmergencyPage } from '../emergency/emergency';
import { LocationProvider } from '../../providers/location-provider';

@Component({
  selector: 'home',
  templateUrl: 'home.html',
})
export class HomePage {
  public currentLocation = {}

  constructor(
    public nav: NavController,
    public locationProvider: LocationProvider,
    private iab: InAppBrowser) {

  }

  ionViewWillEnter() {
    this.locationProvider.getCurrentCity()
      .then((city) => {
        this.currentLocation = city;
      })

    this.locationProvider.newLocation.subscribe((newLocation) => {
        this.currentLocation = newLocation;
      })
  }

  launch(url) {
    this.iab.create(url, '_system');
  }

  emergencyItemTapped() {
    this.nav.push(EmergencyPage);
  }

  servicesItemTapped() {
    this.nav.parent.select(1);
  }
}

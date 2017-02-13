import {Component} from '@angular/core';
import {InAppBrowser} from 'ionic-native';
import {NavController, Loading, LoadingController} from 'ionic-angular';
import {EmergencyPage} from '../emergency/emergency';
import { LocationProvider } from '../../providers/location-provider';
import { ContentProvider } from '../../providers/content-provider';

@Component({
  selector: 'home',
  templateUrl: 'home.html',
})
export class HomePage {

  public loader: Loading;

  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    contentProvider: ContentProvider,
    locationProvider: LocationProvider) {

    this.presentLoading();
    contentProvider.findCities().then(cities => {
      locationProvider.setCurrentCity(cities[0]);
      this.loader.dismiss();
    });
  }

  launch(url) {
    new InAppBrowser(url, "_system");
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({ content: "Please wait..." });
    this.loader.present();
  }

  emergencyItemTapped() {
    this.nav.push(EmergencyPage);
  }

  servicesItemTapped() {
    this.nav.parent.select(1);
  }
}

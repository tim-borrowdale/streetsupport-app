import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NavController } from 'ionic-angular';
import { EmergencyPage } from '../emergency/emergency';
import { ContentProvider } from '../../providers/content-provider';
import { LocationProvider } from '../../providers/location-provider';

@Component({
  selector: 'home',
  templateUrl: 'home.html',
})
export class HomePage {
  public currentLocation = {}
  cities: any;

  constructor(
    public nav: NavController,
    private contentProvider: ContentProvider,
    public locationProvider: LocationProvider,
    private iab: InAppBrowser) {
  }

  ionViewWillEnter() {
    this.contentProvider.findCities().then(cities => {
      this.cities = cities;

      try {
        this.locationProvider.getCurrentCity()
          .then((city) => {
            if(city !== null) {
              this.currentLocation = city;
            }
          })
      } catch (e) {
        console.log(e)
      }
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

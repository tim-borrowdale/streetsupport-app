import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ContentPage} from '../default-content/default-content';
import { EmergencyDetailPage } from '../emergency-detail/emergency-detail';
import {LocationProvider} from '../../providers/location-provider';

@Component({
  selector: 'emergency',
  templateUrl: 'emergency.html'
})
export class EmergencyPage {
  public currentLocation = {}

  constructor(public nav: NavController,
    public locationProvider: LocationProvider) {
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

  itemTapped(contentId) {
    this.nav.push(ContentPage, { contentId: contentId});
  }

  webItemTapped(contentId, url, linkText) {
    this.nav.push(EmergencyDetailPage, { contentId: contentId, url: url, linkText: linkText});
  }
}

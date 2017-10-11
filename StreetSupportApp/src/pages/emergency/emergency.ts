import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ContentPage} from '../default-content/default-content';
import { EmergencyDetailPage } from '../emergency-detail/emergency-detail';


@Component({
  selector: 'emergency',
  templateUrl: 'emergency.html'
})
export class EmergencyPage {

  constructor(public nav: NavController) {

  }

  itemTapped(contentId) {
    this.nav.push(ContentPage, { contentId: contentId});
  }

  webItemTapped(contentId, url, linkText) {
    this.nav.push(EmergencyDetailPage, { contentId: contentId, url: url, linkText: linkText});
  }
}

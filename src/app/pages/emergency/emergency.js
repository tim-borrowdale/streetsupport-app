import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ContentPage} from '../default-content/default-content';


@Component({
  templateUrl: 'build/pages/emergency/emergency.html'
})
export class EmergencyPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }

  itemTapped(event, contentId) {
    this.nav.push(ContentPage, { contentId: contentId});
  }
}

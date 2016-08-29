import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {OrganisationPage} from '../organisation/organisation';


@Component({
  templateUrl: 'build/pages/emergency/emergency.html',
})
export class EmergencyPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }

  showOrganisation(key) {
    this.nav.push(OrganisationPage, { item: {key: key}, reload: true });
  }
}

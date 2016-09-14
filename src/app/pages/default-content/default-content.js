import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {STRINGS} from "../../constants";
import {OrganisationPage} from '../organisation/organisation';


@Component({
  templateUrl: 'build/pages/default-content/default-content.html'
})
export class ContentPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, navParams) {
    this.nav = nav;
    this.contentId = navParams.get('contentId');
    this.content = STRINGS[this.contentId];
  }

  showOrganisation(key) {
    this.nav.push(OrganisationPage, { item: {key: key}, reload: true });
  }
}

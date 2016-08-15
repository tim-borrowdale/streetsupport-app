import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {OrganisationPage} from '../organisation/organisation';


@Component({
  templateUrl: 'build/pages/timetabled-category-detail/timetabled-category-detail.html',
})
export class TimetabledCategoryDetailPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, navParams) {
    this.nav = nav;
    this.provider = navParams.get('item');
  }

  organisationButtonTapped(event, provider) {
    this.nav.push(OrganisationPage, {item: provider, reload: true});
  }
}

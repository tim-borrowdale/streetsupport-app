import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {OrganisationPage} from '../organisation/organisation';


@Component({
  templateUrl: 'timetabled-category-detail.html',
})
export class TimetabledCategoryDetailPage {

  public provider: any;

  constructor(
    public nav: NavController,
    public navParams: NavParams) {
      this.provider = navParams.get('item');
  }

  organisationButtonTapped(provider) {
    this.nav.push(OrganisationPage, {item: provider, reload: true});
  }
}

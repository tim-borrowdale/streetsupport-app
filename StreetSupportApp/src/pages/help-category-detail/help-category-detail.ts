import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {OrganisationPage} from '../organisation/organisation';
import parse from 'marked';


@Component({
  templateUrl: 'help-category-detail.html',
})
export class HelpCategoryDetailPage {

  public provider: any;
  public synopsis: string;

  constructor(
    public nav: NavController,
    public navParams: NavParams) {
      this.nav = nav;
      this.provider = navParams.get('item');
      this.synopsis = parse(this.provider.categorySynopsis);
  }

  organisationButtonTapped(provider) {
    this.nav.push(OrganisationPage, {item: provider.serviceProviderId, reload: true});
  }
}

import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

/*
  Generated class for the OrganisationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/organisation/organisation.html',
})
export class OrganisationPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(navController, navParams) {
    this.organisation = navParams.get('item');
    console.log(navParams);
  }
}

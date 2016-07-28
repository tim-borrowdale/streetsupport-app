import {Component} from '@angular/core';
import {NavController, NavParams, Loading} from 'ionic-angular';
import {ContentService} from '../../services/content-service';


@Component({
  templateUrl: 'build/pages/organisation/organisation.html',
})
export class OrganisationPage {
  static get parameters() {
    return [[NavController], [NavParams], [ContentService]];
  }

  constructor(navController, navParams, contentService) {

    this.nav = navController;
    this.organisation = navParams.get('item');

    let reload = navParams.get('reload');

    if (reload == true) {
      this.presentLoading();

      contentService.findOrganisationBySlug(this.organisation.key)
      .subscribe(data => {
        this.organisation = data;
        this.loading.dismiss();
      });
    }
  }

  presentLoading() {

    this.loading = Loading.create({
      content: "Please wait...",
      dismissOnPageChange: true
    });

    this.nav.present(this.loading);
  }
}

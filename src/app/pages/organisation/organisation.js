import {Component} from '@angular/core';
import {NavController, NavParams, Loading, ActionSheet} from 'ionic-angular';
import {ContentService} from '../../services/content-service';


@Component({
  templateUrl: 'build/pages/organisation/organisation.html'
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

  presentActionSheet() {
    let actionSheet = ActionSheet.create({
      title: 'Contact Organisation',
      buttons: [
        {
          text: 'Telephone',
          handler: () => {
            window.location = `tel:${this.organisation.telephone}`;
          }
        },{
          text: 'Email',
          handler: () => {

          }
        },{
          text: 'Website',
          handler: () => {
            cordova.InAppBrowser.open(this.organisation.website, "_blank", "location=no,toolbarposition=top");
          }
        },{
          text: 'Facebook',
          handler: () => {
            cordova.InAppBrowser.open(this.organisation.facebook, "_blank", "location=no,toolbarposition=top");
          }
        },{
          text: 'Twitter',
          handler: () => {
            cordova.InAppBrowser.open(this.organisation.twitter, "_blank", "location=no,toolbarposition=top");
          }
        },{
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    this.nav.present(actionSheet);
  }

  sortAlphabetically(collection) {

    return collection.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });
  }

  itemTapped(event, service) {

  }
}

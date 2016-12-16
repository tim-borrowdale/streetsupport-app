import {Component} from '@angular/core';
import {InAppBrowser} from 'ionic-native';
import {NavController, NavParams, Loading, LoadingController, ActionSheetController} from 'ionic-angular';
import {ContentService} from '../../services/content-service';
import {OrganisationServicePage} from '../organisation-service/organisation-service';


@Component({
  templateUrl: 'organisation.html'
})
export class OrganisationPage {

  public organisation: any;
  public loader: Loading;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    public contentService: ContentService) {

    this.organisation = navParams.get('item');

    let reload = navParams.get('reload');

    if (reload == true) {
      this.presentLoading();

      contentService.findOrganisationBySlug(this.organisation.key)
      .then(data => {
        this.organisation = data;
        this.loader.dismiss();
      });
    }
  }

  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: true
    });

    this.loader.present();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact Organisation',
      buttons: [
        {
          text: 'Telephone',
          handler: () => {
            (window as any).location = `tel:${this.organisation.telephone}`;
          }
        },{
          text: 'Email',
          handler: () => {
            (window as any).location = `mailto:${this.organisation.email}`;
          }
        },{
          text: 'Website',
          handler: () => {
            new InAppBrowser(this.organisation.website, '_system');
          }
        },{
          text: 'Facebook',
          handler: () => {
            new InAppBrowser(this.organisation.facebook, "_system", "location=no");
          }
        },{
          text: 'Twitter',
          handler: () => {
            new InAppBrowser(this.organisation.twitter, "_system", "location=no");
          }
        },{
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  sortAlphabetically(collection) {
    if (collection !== undefined) {
      return collection.sort(function(a, b) {
        return a.name.localeCompare(b.name);
      });
    }
  }

  itemTapped(event, service) {
    this.nav.push(OrganisationServicePage, {service: service});
  }
}

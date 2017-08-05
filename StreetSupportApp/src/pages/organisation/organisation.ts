import {Component} from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {NavController, NavParams, Loading, LoadingController, ActionSheetController} from 'ionic-angular';
import {ContentProvider} from '../../providers/content-provider';
import {OrganisationServicePage} from '../organisation-service/organisation-service';


@Component({
  templateUrl: 'organisation.html'
})
export class OrganisationPage {

  public organisation: any = {};
  public orgAddresses: any;
  public services: any;
  public loader: Loading;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    public contentProvider: ContentProvider,
    private iab: InAppBrowser
  ) {

    let organisationId = navParams.get('item');

    this.presentLoading();

    contentProvider.findOrganisationBySlug(organisationId)
    .then(data => {
      this.organisation = data;
      this.orgAddresses = data.addresses;
      this.services = data.providedServices;
      this.loader.dismiss();
    });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({ content: "Please wait..." });
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
            let browser = this.iab.create(this.organisation.website, '_system','');
            browser.show();
          }
        },{
          text: 'Facebook',
          handler: () => {
            let browser = this.iab.create(this.organisation.facebook, '_system','location=no');
            browser.show();
          }
        },{
          text: 'Twitter',
          handler: () => {
            let browser = this.iab.create(this.organisation.twitter, '_system','location=no');
            browser.show();
          }
        },{
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  itemTapped(event, service) {
    this.nav.push(OrganisationServicePage, {service: service});
  }
}

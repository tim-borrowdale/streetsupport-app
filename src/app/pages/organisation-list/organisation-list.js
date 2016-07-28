import {Component} from "@angular/core";
import {NavController, NavParams, Loading} from 'ionic-angular';
import {ContentService} from '../../services/content-service';
import {OrganisationPage} from '../organisation/organisation';


@Component({
  templateUrl: 'build/pages/organisation-list/organisation-list.html'
})
export class OrganisationListPage {
  static get parameters() {
    return [[NavController], [NavParams], [ContentService]];
  }

  constructor(nav, navParams, contentService) {
    this.nav = nav;
    this.contentService = contentService;
    this.selectedItem = navParams.get('item');
  }

  ngOnInit() {
    this.presentLoading();

    this.contentService.findOrganisations().subscribe(data => {
      this.providers = data;
      this.loading.dismiss();
    });
  }

  itemTapped(event, provider) {
    this.nav.push(OrganisationPage, { item: provider });
  }

  presentLoading() {

    this.loading = Loading.create({
      content: "Please wait...",
      dismissOnPageChange: true
    });

    this.nav.present(this.loading);
  }
}

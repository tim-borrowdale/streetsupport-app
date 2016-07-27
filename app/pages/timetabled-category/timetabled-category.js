import {Component} from "@angular/core";
import {NavController, NavParams, Loading} from 'ionic-angular';
import {LocationProvider} from '../../providers/location-provider';
import {ContentService} from '../../services/content-service';
import {OrganisationPage} from '../organisation/organisation';


@Component({
  templateUrl: 'build/pages/timetabled-category/timetabled-category.html',
  providers: [LocationProvider]
})
export class TimetabledCategoryPage {

  static get parameters() {
    return [[NavController], [NavParams], [LocationProvider], [ContentService]];
  }

  constructor(nav, navParams, locationProvider, contentService) {
    this.nav = nav;
    this.contentService = contentService;
    this.locationProvider = locationProvider;
    this.category = navParams.get('item');

    this.getServicesForLocation()
  }

  getServicesForLocation() {

    this.presentLoading();

    var self = this;

    this.locationProvider.getLocation().then(function(location) {
      self.location = location;
    }).then(function() {
      self.contentService.findTimetabledServices(self.category.key, self.location.lat, self.location.lng).subscribe(data => {
        self.category = data;
        self.loading.dismiss();
      });
    });
  }

  presentLoading() {
    this.loading = Loading.create({
      content: "Please wait...",
      dismissOnPageChange: true
    });

    this.nav.present(this.loading);
  }

  itemTapped(event, provider) {
    this.nav.push(OrganisationPage, { item: provider, reload: true });
  }
}

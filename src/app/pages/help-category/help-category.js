import {Component} from "@angular/core";
import {NavController, NavParams, Loading, Storage, LocalStorage, Alert} from 'ionic-angular';
import {LocationProvider} from '../../providers/location-provider';
import {ContentService} from '../../services/content-service';
import {HelpCategoryDetailPage} from '../help-category-detail/help-category-detail';
import parse from 'marked';

@Component({
  templateUrl: 'build/pages/help-category/help-category.html',
  providers: [LocationProvider]
})
export class HelpCategoryPage {

  static get parameters() {
    return [[NavController], [NavParams], [LocationProvider], [ContentService]];
  }

  constructor(nav, navParams, locationProvider, contentService) {
    this.nav = nav;
    this.storage = new Storage(LocalStorage);
    this.contentService = contentService;
    this.locationProvider = locationProvider;
    this.category = navParams.get('item');
    this.category.synopsis = parse(this.category.synopsis);

    this.storage.get('locationEnabled').then((val) => {
      if (val === null) {
        this.locationEnabled = false;
      } else {
        this.locationEnabled = val;
      }

      this.loadServices();
    });
  }

  loadServices() {
    this.presentLoading();

    if (this.locationEnabled) {
      return this.locationProvider.getLocation().then(location => {
        this.getServices(this.category.key, location);
      }).catch(error => {
        let alert = Alert.create({
          title: 'Location Error',
          subTitle: error,
          buttons: ['Ok']
        });

        this.nav.present(alert);
        this.getServices(this.category.key, {});
      });
    }

    this.getServices(this.category.key, {});
  }

  getServices(category, location) {
    this.contentService.findStandardServices(
      category,
      location.latitude,
      location.longitude).subscribe(data => {
        this.category = data;
        this.category.synopsis = parse(this.category.synopsis);
        this.loading.dismiss();
    });
  }

  sortAlphabetically(collection) {
    return collection.sort(function(a, b) {
      return a.name.localeCompare(b.name);
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
    this.nav.push(HelpCategoryDetailPage, { item: provider, reload: true });
  }

  changeLocation(event) {
    this.locationEnabled = !this.locationEnabled;
    this.storage.set('locationEnabled', this.locationEnabled);
    this.loadServices();
  }
}

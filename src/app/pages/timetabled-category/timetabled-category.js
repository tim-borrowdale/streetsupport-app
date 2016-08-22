import {Component} from "@angular/core";
import {NavController, NavParams, Loading, Storage, LocalStorage, Alert} from 'ionic-angular';
import {LocationProvider} from '../../providers/location-provider';
import {ContentService} from '../../services/content-service';
import {TimetabledCategoryDetailPage} from '../timetabled-category-detail/timetabled-category-detail';


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
    this.storage = new Storage(LocalStorage);
    this.contentService = contentService;
    this.locationProvider = locationProvider;
    this.category = navParams.get('item');

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
        this.location = location;
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
    this.contentService.findTimetabledServices(
      category,
      location.latitude,
      location.longitude).subscribe(data => {
        this.serviceDays = this.sortByDay(data.daysServices);
        this.loading.dismiss();
    });
  }

  sortByDay(days) {

    const day_of_week = new Date().getDate();
    let list = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let sorted_list = list.slice(day_of_week).concat(list.slice(0, day_of_week));

    return days.sort(function(a,b) {
      return sorted_list.indexOf(a.name) > sorted_list.indexOf(b.name);
    });
  }

  sortByOpeningTime(providers) {
    return providers.sort(function(a, b) {
      const dateA = new Date('1970/01/01 ' + a.openingTime.startTime);
      const dateB = new Date('1970/01/01 ' + b.openingTime.startTime )
      return dateA - dateB;
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
    this.nav.push(TimetabledCategoryDetailPage, { item: provider });
  }

  changeLocation(event) {
    this.locationEnabled = !this.locationEnabled;
    this.storage.set('locationEnabled', this.locationEnabled);
    this.loadServices();
  }
}

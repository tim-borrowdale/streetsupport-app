import {Component} from "@angular/core";
import {NavController, NavParams, Loading, Storage, LocalStorage} from 'ionic-angular';
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

    const self = this;

    this.presentLoading();

    if (this.locationEnabled) {
      return this.locationProvider.getLocation().then(function(location) {
        self.location = location;
      }).then(function(){
        self.getServices();
      });
    }

    self.getServices();
  }

  getServices() {
    const self = this;

    self.contentService.findTimetabledServices(self.category.key).subscribe(data => {
      self.serviceDays = self.sortByDay(data.daysServices);
      self.loading.dismiss();
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

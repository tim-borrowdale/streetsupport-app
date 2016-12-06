import {Component} from "@angular/core";
import {Storage} from '@ionic/storage';
import {NavController, NavParams, Loading, LoadingController, AlertController} from 'ionic-angular';
import {LocationProvider} from '../../providers/location-provider';
import {ContentService} from '../../services/content-service';
import {TimetabledCategoryDetailPage} from '../timetabled-category-detail/timetabled-category-detail';


@Component({
  templateUrl: 'timetabled-category.html',
  providers: [LocationProvider, ContentService]
})
export class TimetabledCategoryPage {

  public category: any;
  public locationEnabled = false;
  public location: any;
  public serviceDays: any;
  public loader: Loading;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public locationProvider: LocationProvider,
    public contentService: ContentService,
    public storage: Storage) {

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
        this.getServices(this.category.key, location);
      }).catch(error => {
        this.loader.dismissAll();
        let alert = this.alertCtrl.create({
          title: 'Location Error',
          subTitle: error,
          buttons: ['Ok']
        });

        alert.present();
        this.getServices(this.category.key, {});
      });
    }

    this.getServices(this.category.key, {});
  }

  getServices(category, location) {
    this.contentService.findTimetabledServices(
      category,
      location.latitude,
      location.longitude).then(data => {
        this.serviceDays = this.sortByDay(data.daysServices);
        this.loader.dismissAll();
    }).catch(error => {
      let alert = this.alertCtrl.create({
        title: 'API Error',
        subTitle: 'could not get data at this time. Please try again later.',
        buttons: ['Ok']
      });

      alert.present();
    });
  }

  sortByDay(days) {
    const day_of_week = new Date().getDay();
    console.log(day_of_week);
    let list = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let sorted_list = list.slice(day_of_week).concat(list.slice(0, day_of_week));
    console.log(sorted_list);

    return days.sort(function(a,b) {
      return sorted_list.indexOf(a.name) > sorted_list.indexOf(b.name);
    });
  }

  sortByOpeningTime(providers) {
    return providers.sort(function(a, b) {
      const dateA = new Date('1970/01/01 ' + a.openingTime.startTime);
      const dateB = new Date('1970/01/01 ' + b.openingTime.startTime);

      return dateA.valueOf() - dateB.valueOf();
    });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: false
    });

    this.loader.present();
  }

  itemTapped(provider) {
    this.nav.push(TimetabledCategoryDetailPage, { item: provider });
  }

  changeLocation() {
    this.locationEnabled = !this.locationEnabled;
    this.storage.set('locationEnabled', this.locationEnabled);
    this.loadServices();
  }
}

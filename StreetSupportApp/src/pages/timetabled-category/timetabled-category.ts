import {Component} from "@angular/core";
import {NavController, NavParams, Loading, LoadingController, AlertController} from 'ionic-angular';
import {ContentProvider} from '../../providers/content-provider';
import {LocationProvider} from '../../providers/location-provider';
import {TimetabledCategoryDetailPage} from '../timetabled-category-detail/timetabled-category-detail';
import parse from 'marked';


@Component({
  templateUrl: 'timetabled-category.html'
})
export class TimetabledCategoryPage {

  public categoryKey: string;
  public cityName: string;
  public category: any = {};
  public serviceDays: any;
  public loader: Loading;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public contentService: ContentProvider,
    public locationProvider: LocationProvider) {

    this.categoryKey = navParams.get('category');
  }

  ionViewWillEnter() {
    this.locationProvider.getCurrentCity().then(city => {
      if (this.cityName !== city.name) {
        this.cityName = city.name;
        this.loadServices(city.id);
      }
    });
  }

  loadServices(cityId) {
    this.presentLoading();

    this.contentService.findTimetabledServices(this.categoryKey, cityId).then(data => {
      this.category = data;
      this.serviceDays = data.daysServices;
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

  private getSortedDayNames() {
    const currentDayIndex = new Date().getDay();
    let dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return dayNames.slice(currentDayIndex).concat(dayNames.slice(0, currentDayIndex));
  }

  sortByDay(days) {
    let daysOfWeek = this.getSortedDayNames();

    return days.sort(function(a, b) {

      var indexA = daysOfWeek.indexOf(a.name);
      var indexB = daysOfWeek.indexOf(b.name);

      if (indexA < indexB) {
        return -1;
      }
      if (indexA > indexB) {
        return 1;
      }

      return 0;
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
    this.loader = this.loadingCtrl.create({ content: "Please wait..." });
    this.loader.present();
  }

  itemTapped(provider) {
    this.nav.push(TimetabledCategoryDetailPage, { item: provider });
  }

  locationChanged(city) {
    this.cityName = city.name;
    this.loadServices(city.id);
  }
}

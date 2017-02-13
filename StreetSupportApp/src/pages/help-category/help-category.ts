import {Component} from "@angular/core";
import {Storage} from '@ionic/storage';
import {NavController, NavParams, Loading, LoadingController, AlertController} from 'ionic-angular';
import {ContentProvider} from '../../providers/content-provider';
import {LocationProvider} from '../../providers/location-provider';
import {HelpCategoryDetailPage} from '../help-category-detail/help-category-detail';
import parse from 'marked';

@Component({
  templateUrl: 'help-category.html'
})
export class HelpCategoryPage {

  public categoryKey: string;
  public cityName: string;
  public category = {};
  public providers = [];
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

    this.contentService.findStandardServices(this.categoryKey, cityId).then(data => {
      this.category = data.category;
      this.providers = data.providers;
      this.loader.dismissAll();
    }).catch(error => {
      this.loader.dismissAll();
      let alert = this.alertCtrl.create({
        title: 'API Error',
        subTitle: 'could not get data at this time. Please try again later.',
        buttons: ['Ok']
      });

      alert.present();
    });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({ content: "Please wait..." });
    this.loader.present();
  }

  itemTapped(provider) {
    this.nav.push(HelpCategoryDetailPage, { item: provider, reload: true });
  }

  locationChanged(city) {
    this.cityName = city.name;
    this.loadServices(city.id);
  }
}

import {Component} from "@angular/core";
import {Storage} from '@ionic/storage';
import {NavController, NavParams, Loading, LoadingController, AlertController} from 'ionic-angular';
import {LocationProvider} from '../../providers/location-provider';
import {ContentService} from '../../services/content-service';
import {HelpCategoryDetailPage} from '../help-category-detail/help-category-detail';
import parse from 'marked';

@Component({
  templateUrl: 'help-category.html',
  providers: [LocationProvider, ContentService]
})
export class HelpCategoryPage {

  public category: any;
  public loader: Loading;
  public locationEnabled = false;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public contentService: ContentService,
    public locationProvider: LocationProvider,
    public storage: Storage) {

    this.category = navParams.get('item');
    this.category.subCategories = null;
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
    this.contentService.findStandardServices(
      category,
      location.latitude,
      location.longitude).then(data => {
        this.category = data;
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

  sortAlphabetically(collection) {
    if (collection === null) {
      return collection;
    }

    return collection.sort(function(a, b) {
      return a.name.localeCompare(b.name);
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
    this.nav.push(HelpCategoryDetailPage, { item: provider, reload: true });
  }

  changeLocation() {
    this.locationEnabled = !this.locationEnabled;
    this.storage.set('locationEnabled', this.locationEnabled);
    this.loadServices();
  }
}

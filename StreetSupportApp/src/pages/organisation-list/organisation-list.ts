import {Component} from "@angular/core";
import {NavController, Loading, LoadingController} from 'ionic-angular';
import {ContentProvider} from '../../providers/content-provider';
import {LocationProvider} from '../../providers/location-provider';
import {OrganisationPage} from '../organisation/organisation';


@Component({
  templateUrl: 'organisation-list.html'
})
export class OrganisationListPage {

  public providers: any;
  public loader: Loading;
  public cityName: string;

  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public contentProvider: ContentProvider,
    public locationProvider: LocationProvider) { }

  ionViewWillEnter() {
    this.locationProvider.getCurrentCity().then(city => {
      if (this.cityName !== city.name) {
        this.cityName = city.name;
        this.loadProviders(city.id);
      }
    });
  }

  itemTapped(event, provider) {
    this.nav.push(OrganisationPage, { item: provider.key });
  }

  locationChanged(city) {
    this.cityName = city.name;
    this.loadProviders(city.id);
  }


  private loadProviders(cityId) {
    this.presentLoading();

    this.contentProvider.findOrganisations(cityId).then(data => {
      this.providers = data;
      this.loader.dismiss();
    });
  }

  private presentLoading() {
    this.loader = this.loadingCtrl.create({ content: "Please wait..." });
    this.loader.present();
  }
}

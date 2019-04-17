import {Component} from "@angular/core";
import {NavController, Loading, LoadingController} from 'ionic-angular';
import {ContentProvider} from '../../providers/content-provider';
import {LocationProvider} from '../../providers/location-provider';
import {OrganisationPage} from '../organisation/organisation';
import {ClientGroupFilter} from '../../pipes/filter-by-client-group';

interface ClientGroupType {
  key: string
  name: string
  sortPosition: number
}

@Component({
  templateUrl: 'organisation-list.html'
})
export class OrganisationListPage {

  public providers: any;
  public loader: Loading;
  public cityName: string;
  public clientGroupTypes: ClientGroupType[];
  public clientGroupFilter: ClientGroupFilter;

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
    this.clientGroupFilter = {filterTypes: ['age-11-25']};
  }

  itemTapped(event, provider) {
    this.nav.push(OrganisationPage, { item: provider.key });
  }

  locationChanged(city) {
    this.cityName = city.name;
    this.loadProviders(city.id);
  }

  filterToggled(filter) {
    console.log(filter);
  }


  private loadProviders(cityId) {
    this.presentLoading();

    this.contentProvider.findOrganisations(cityId).then(data => {
      this.clientGroupTypes = this.discoverClientGroupTypes(data);
      this.providers = data;
      this.loader.dismiss();
    });
  }

  private presentLoading() {
    this.loader = this.loadingCtrl.create({ content: "Please wait..." });
    this.loader.present();
  }

  private discoverClientGroupTypes(data): ClientGroupType[] {
    var clientGroups = new Array();
    return clientGroups;
  }
}

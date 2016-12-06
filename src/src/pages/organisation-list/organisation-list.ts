import {Component} from "@angular/core";
import {NavController, NavParams, Loading, LoadingController} from 'ionic-angular';
import {ContentService} from '../../services/content-service';
import {OrganisationPage} from '../organisation/organisation';


@Component({
  templateUrl: 'organisation-list.html'
})
export class OrganisationListPage {

  public selectedItem: any;
  public providers: any;
  public loader: Loading;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public contentService: ContentService) {

      this.selectedItem = navParams.get('item');
  }

  ngOnInit() {
    this.presentLoading();

    this.contentService.findOrganisations().then(data => {
      this.providers = data;
      this.loader.dismiss();
    });
  }

  itemTapped(event, provider) {
    this.nav.push(OrganisationPage, { item: provider });
  }

  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: true
    });

    this.loader.present();
  }
}

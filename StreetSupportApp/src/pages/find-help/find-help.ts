import {Component, OnInit} from "@angular/core";
import {NavController, NavParams, Loading, LoadingController} from 'ionic-angular';
import {ContentService} from '../../services/content-service';
import {HelpCategoryPage} from '../help-category/help-category';
import {TimetabledCategoryPage} from '../timetabled-category/timetabled-category';


@Component({
  templateUrl: 'find-help.html'
})

export class FindHelpPage implements OnInit {

  public selectedItem: any;
  public categories: any;
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
    this.contentService.findServiceCategories().then(data => {

      data.sort(function(a, b) {
        if (a.sortOrder < b.sortOrder) {
          return 1;
        }
        if (a.sortOrder > b.sortOrder) {
          return -1;
        }
        return 0;
      });

      this.categories = data;
      this.loader.dismiss();
    });
  }

  itemTapped(event, category) {

    if (category.key === 'dropin' || category.key === 'meals') {
      this.nav.push(TimetabledCategoryPage, { item: category });
      return;
    }

    this.nav.push(HelpCategoryPage, { item: category });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: true
    });

    this.loader.present();
  }
}

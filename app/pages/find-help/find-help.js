import {Component} from "@angular/core";
import {NavController, NavParams, Loading} from 'ionic-angular';
import {ContentService} from '../../services/content-service';
import {HelpCategoryPage} from '../help-category/help-category';
import {TimetabledCategoryPage} from '../timetabled-category/timetabled-category';


@Component({
  templateUrl: 'build/pages/find-help/find-help.html'
})

export class FindHelpPage {
  // provide Angular with metadata about things it should inject in the constructor
  static get parameters() {
    return [[NavController], [NavParams], [ContentService]];
  }

  constructor(nav, navParams, contentService) {
    this.nav = nav;
    this.contentService = contentService;
    this.selectedItem = navParams.get('item');
  }

  ngOnInit() {
    this.presentLoading();

    this.contentService.findServiceCategories().subscribe(data => {

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
      this.loading.dismiss();
    });
  }

  itemTapped(event, category) {

    if (category.subCategories[0].key === 'general') {
      this.nav.push(TimetabledCategoryPage, { item: category });
      return;
    }

    this.nav.push(HelpCategoryPage, { item: category });
  }

  presentLoading() {

    this.loading = Loading.create({
      content: "Please wait...",
      dismissOnPageChange: true
    });

    this.nav.present(this.loading);
  }
}

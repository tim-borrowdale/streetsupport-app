import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/help-category/help-category.html'
})
export class HelpCategoryPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(navParams) {
    this.category = navParams.category;
  }
}

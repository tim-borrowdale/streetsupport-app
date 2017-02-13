import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {STRINGS} from "../../constants";


@Component({
  selector: 'default-content',
  templateUrl: 'default-content.html'
})
export class ContentPage {

  public content: string;

  constructor(public nav: NavController, navParams: NavParams) {
    const contentId = navParams.get('contentId');
    this.content = STRINGS[contentId];
  }
}

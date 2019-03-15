import { Component } from "@angular/core";
import { Loading, NavParams } from "ionic-angular";
import { InAppBrowser } from "@ionic-native/in-app-browser";

@Component({
  templateUrl: 'need-responses.html'
})

export class NeedResponsePage {
  private need: any;
  public loader: Loading;

  constructor(
    private navParams: NavParams,
    private iab: InAppBrowser
  ) {
    this.need = navParams.get('need');
  }
}

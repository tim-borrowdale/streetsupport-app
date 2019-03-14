import { Component } from "@angular/core";
import { Loading, NavController, LoadingController, NavParams } from "ionic-angular";

@Component({
  templateUrl: 'need-responses.html'
})

export class NeedResponsePage {
  private need: any;
  public loader: Loading;

  constructor(
    public navParams: NavParams,
    public nav: NavController,
  ) {
    this.need = navParams.get('need');
  }

  ionViewWillEnter() {
  }

  loadNeeds() {
  }
}

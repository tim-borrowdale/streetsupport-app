import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';


@Component({
  templateUrl: 'organisation-service.html',
})
export class OrganisationServicePage {

  public service: any;

  constructor(
    public nav:NavController,
    public navParams: NavParams) {
      this.service = navParams.get('service');
  }
}

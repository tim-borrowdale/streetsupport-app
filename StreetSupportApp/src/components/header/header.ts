import { Component, Output, EventEmitter } from '@angular/core';
import { NavController, ActionSheetController, AlertController, Loading, LoadingController } from 'ionic-angular';
import { ContentProvider } from '../../providers/content-provider';
import { LocationProvider } from '../../providers/location-provider';
import {SettingsPage} from '../../pages/settings/settings';

@Component({
  selector: 'ion-header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  public currentCity: any = {};
  cities: any;
  loader: Loading;
  @Output() didChangeLocation = new EventEmitter<string>();

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private contentProvider: ContentProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private locationProvider: LocationProvider,
    private nav: NavController) {

    this.presentLoading();
    this.contentProvider.findCities().then(cities => {
      this.cities = cities;

      // TODO
      this.locationProvider.getCurrentCity().then(city => {
        if (city === null) {
          this.gotoSettings();
        } else {
          this.currentCity = city;
        }
        this.loader.dismiss();
      }).catch((error) => {
        this.loader.dismiss();
      });
    });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({ content: "Please wait..." });
    this.loader.present();
  }

  gotoSettings() {
    this.nav.push(SettingsPage)
    // let actionSheet = this.actionSheetCtrl.create({
    //   title: 'Choose a location',
    //   buttons: this.getActionButtons()
    // });

    // actionSheet.present();
  }

  alertCityUpdated(cityName, callback) {
    let alert = this.alertCtrl.create({
      title: 'City Updated',
      subTitle: `Your current city is set to ${cityName}`,
      buttons: [{
        text: 'OK',
        handler: callback
      }]
    });
    alert.present();
  }

  private getActionButtons(): string[] {
    let buttons = this.cities
      .sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      })
      .map((c) => {
        return {
          text: c.name, handler: () => {
            this.changeLocation(c);
          }
        }
      });

    buttons.push({ text: 'Cancel', role: 'cancel' });
    return buttons;
  }

  private changeLocation(city) {
    if (city.id !== this.currentCity.id) {
      this.currentCity = city;
      this.locationProvider.setCurrentCity(city);
      this.alertCityUpdated(city.name, () => {
        this.didChangeLocation.emit(city);
      });
    }
  }
}

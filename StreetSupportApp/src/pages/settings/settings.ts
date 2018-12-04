import { Component, Output, EventEmitter } from '@angular/core';
import { ActionSheetController, AlertController, Loading, LoadingController } from 'ionic-angular';
import { ContentProvider } from '../../providers/content-provider';
import { LocationProvider } from '../../providers/location-provider';

@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  cities: any;
  loader: Loading;
  public currentCity: any = {};
  @Output() didChangeLocation = new EventEmitter<string>();

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private contentProvider: ContentProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private locationProvider: LocationProvider) {

    this.presentLoading();

    this.contentProvider.findCities()
      .then(cities => {
        this.cities = cities;
      
        this.locationProvider.getCurrentCity()
          .then(city => {
            if (city === null) {
              this.presentLocationChange(false)
            } else {
              this.currentCity = city;
            }
            this.loader.dismiss();
          })
      })
      .catch(err => {
        this.loader.dismiss();
      })
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({ content: "Please wait..." });
    this.loader.present();
  }

  presentLocationChange(hasCityAlready: boolean = true) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Please choose your Location Hub',
      subTitle: 'The Street Support Network is made of many Hubs across the country who work in partnership in that area. Select your nearest one to view relevant content.',
      buttons: this.getActionButtons(hasCityAlready)
    });

    actionSheet.present();
  }

  private getActionButtons(hasCityAlready: boolean): string[] {
    const cities = this.cities
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

    return hasCityAlready
      ? [...cities, { text: 'Cancel', role: 'cancel' }]
      : cities;
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

  alertCityUpdated(cityName, callback) {
    let alert = this.alertCtrl.create({
      title: 'Hub Updated',
      subTitle: `Your current Hub is set to ${cityName}`,
      buttons: [{
        text: 'OK',
        handler: callback
      }]
    });
    alert.present();
  }
}

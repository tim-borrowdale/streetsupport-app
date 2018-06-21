import { Component, Output, EventEmitter } from '@angular/core';
import { ActionSheetController, AlertController, Loading, LoadingController } from 'ionic-angular';
import { ContentProvider } from '../../providers/content-provider';
import { LocationProvider } from '../../providers/location-provider';


@Component({
  selector: 'ion-header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  public currentCity: any;
  cities: any;
  loader: Loading;
  @Output() didChangeLocation = new EventEmitter<string>();

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private contentProvider: ContentProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private locationProvider: LocationProvider) {

      // contentProvider.findCities().then(cities => {
      //   this.cities = cities;
      // });

      // this.presentLoading();
      // this.locationProvider.getCurrentCity().then(city => {
      //   if (city === null) {
      //     this.locationProvider.setCurrentCity(this.cities[0]);
      //     this.currentCity = this.cities[0];
      //   } else {
      //     this.currentCity = city;
      //   }

      //   this.loader.dismiss();
      // }).catch((error) => {
      //   this.loader.dismiss();
      // });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({ content: "Please wait..." });
    this.loader.present();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose a location',
      buttons: this.getActionButtons()
    });

    actionSheet.present();
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

    var buttons = [];

    for (let city of this.cities) {
      buttons.push({ text: city.name, handler: () => {
        this.changeLocation(city);
      }});
    }

    // buttons.push({ text: 'My Location', handler: () => {
    //   this.changeLocation({id: null, name: 'My Location'});
    // }});

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

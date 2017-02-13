import { Component, Output, EventEmitter } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';
import { ContentProvider } from '../../providers/content-provider';
import { LocationProvider } from '../../providers/location-provider';



@Component({
  selector: 'ion-header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  public currentCity: any;
  cities: any;

  @Output() didChangeLocation = new EventEmitter<string>();

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public contentProvider: ContentProvider,
    public locationProvider: LocationProvider) {

      contentProvider.findCities().then(cities => {
        this.cities = cities;
      });

      this.locationProvider.getCurrentCity().then(city => {
        this.currentCity = city;
      });
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose a location',
      buttons: this.getActionButtons()
    });

    actionSheet.present();
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
    this.locationProvider.setCurrentCity(city);
    this.didChangeLocation.emit(city);
  }
}

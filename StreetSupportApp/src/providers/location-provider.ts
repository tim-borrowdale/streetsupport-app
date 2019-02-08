import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { STRINGS } from "../constants";
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()
export class LocationProvider {
  private locationUpdateObserver: any;
  public newLocation: any = {};

  constructor(private storage: Storage, private geolocation: Geolocation) {
    this.locationUpdateObserver = null;
    this.newLocation = Observable.create(observer => {
      this.locationUpdateObserver = observer;
    });
  }

  getCurrentCity(): any {
    return this.storage.get('location');
  }

  setCurrentCity(city) {
    this.storage.set('location', city);
    this.locationUpdateObserver.next(city);
  }

  getUserLocation() {
    return this.geolocation.getCurrentPosition({ timeout: 3000 })
      .then((resp) => {
        return {
          latitude: resp.coords.latitude,
          longitude: resp.coords.longitude
        };
      })
      .catch((error) => {
        let errorMessage = error.message;

        if (error.code === 1) {
          errorMessage = STRINGS.LOCATION_ERROR_MESSAGE;
        }

        return errorMessage;
      })
  }
}

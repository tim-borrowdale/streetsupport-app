import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Geolocation} from 'ionic-native';
import {STRINGS} from "../constants";


@Injectable()
export class LocationProvider {

  constructor(private storage: Storage) { }

  getCurrentCity(): any {
    return this.storage.get('location');
  }

  setCurrentCity(city) {
    this.storage.set('location', city);
  }

  getUserLocation() {
    return Geolocation.getCurrentPosition({ timeout: 5000 }).then((resp) => {
      return {
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude
      };
    }).catch((error) => {
      let errorMessage = error.message;

      if (error.code === 1) {
        errorMessage = STRINGS.LOCATION_ERROR_MESSAGE;
      }

      return errorMessage;
    })
  }
}

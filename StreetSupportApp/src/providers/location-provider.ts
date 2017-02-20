import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Diagnostic, Geolocation} from 'ionic-native';
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
    return new Promise((resolve, reject) => {

      if (!Diagnostic.isLocationEnabled) {
        reject('Location services need to be enabled.')
        return;
      }

      if (!Diagnostic.isLocationAuthorized) {
        Diagnostic.requestLocationAuthorization().then(status => {
          if (status == Diagnostic.permissionStatus.GRANTED ||
            status == Diagnostic.permissionStatus.GRANTED_WHEN_IN_USE) {
              this.getLocationData(resolve, reject);
              return;
            }

          reject('Location services were denied by the user.');
          return;
        });
      }

      this.getLocationData(resolve, reject);
    });
  }

  private getLocationData(resolve, reject) {
    Geolocation.getCurrentPosition().then((resp) => {

      var position = {
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude
      };

      resolve(position);

    }).catch((error) => {
      let errorMessage = error.message;

      if (error.code === 1) {
        errorMessage = STRINGS.LOCATION_ERROR_MESSAGE;
      }

      reject(errorMessage);
    })
  }
}

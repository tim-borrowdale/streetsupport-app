import {Injectable} from '@angular/core';
import {Geolocation} from 'ionic-native';
import {STRINGS} from "../constants";


@Injectable()
export class LocationProvider {

  getLocation() {

    return new Promise((resolve, reject) => {

      Geolocation.getCurrentPosition().then((resp) => {

        var position = {
          latitude: resp.coords.latitude,
          longitude: resp.coords.longitude
        };

        resolve(position);

      }).catch((error) => {
        console.error(error);
        let errorMessage = error.message;

        if (error.code === 1) {
          errorMessage = STRINGS.LOCATION_ERROR_MESSAGE;
        }

        reject(errorMessage);
      })
    });
  }
}

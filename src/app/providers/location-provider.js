import {Injectable} from '@angular/core';
import {Geolocation} from 'ionic-native';


@Injectable()
export class LocationProvider {

  getLocation() {

    return new Promise(resolve => {

      Geolocation.getCurrentPosition().then((resp) => {

        var position = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        };

        resolve(position);
      })
    });
  }
}

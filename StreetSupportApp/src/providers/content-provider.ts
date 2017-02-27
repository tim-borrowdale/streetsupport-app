import {Injectable} from "@angular/core";
import {ApiProvider} from "./api-provider";
import {LocationProvider} from "./location-provider";


@Injectable()
export class ContentProvider {

  cities: any;

  constructor(
    public api: ApiProvider,
    public locationProvider: LocationProvider) { }

  findCities(): any {

    if (this.cities !== undefined) {
      return Promise.resolve(this.cities);
    }

    return this.api.call('/v1/cities').then(cities => {
      return this.cities = cities;
    });
  }

  findServiceCategories(): any {
    return this.api.call('/v2/service-categories');
  }

  findStandardServices(category, city, useLocation): any {
    if (useLocation == true) {
      return this.findServicesByLocation('service-categories', category, 10000).then(data => {
        return {
          locationEnabled: true,
          services: data
        };
      })
      .catch(error => {
        return this.findServicesByCity('services', category, city, 10000).then(data => {
          return {
            locationEnabled: false,
            services: data
          };
        });
      });
    } else {
      return this.findServicesByCity('services', category, city, 10000).then(data => {
        return {
          locationEnabled: false,
          services: data
        };
      });
    }
  }

  findTimetabledServices(category, city): any {
    return this.findServicesByLocation('services-by-day', category, 10000).then(data => {
      return {
        locationEnabled: true,
        services: data
      };
    })
    .catch(error => {
      return this.findServicesByCity('services', category, city, 10000).then(data => {
        return {
          locationEnabled: false,
          services: data
        };
      });
    });
  }

  findOrganisations(city): any {
    if (city === undefined || city === null) {
      city = '';
    }
    return this.api.call(`/v2/service-providers/${city}`);
  }

  findOrganisationBySlug(slug) {
    return this.api.call(`/v2/service-providers/show/${slug}`);
  }

  private findServicesByCity(type, category, city, range) {
    return this.api.call(`/v1/cities/${city}/${type}/${category}?range=${range}`);
  }

  private findServicesByLocation(type, category, range) {
    return this.locationProvider.getUserLocation().then((location: any) => {
      let url = `/v2/${type}/${category}/${location.latitude}/${location.longitude}?range=${range}`;
      return this.api.call(url);
    });
  }
}

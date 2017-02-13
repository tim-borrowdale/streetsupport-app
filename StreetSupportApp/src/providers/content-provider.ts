import {Injectable} from "@angular/core";
import {ApiProvider} from "./api-provider";
import {LocationProvider} from "./location-provider";


@Injectable()
export class ContentProvider {

  constructor(
    public api: ApiProvider,
    public locationProvider: LocationProvider) { }

  cities: any;

  findCities(): any {

    if (this.cities !== undefined) {
      return Promise.resolve(this.cities);
    }

    return this.api.call('/v1/cities').then(cities => {
      this.cities = cities.filter(c => c.swepIsAvailable === true);
      return this.cities;
    });
  }

  findServiceCategories(): any {
    return this.api.call('/v2/service-categories');
  }

  findStandardServices(category, city): any {
    return this.findServices('services', category, city);
  }

  findTimetabledServices(category, city): any {
    return this.findServices('services-by-day', category, city);
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


  private findServices(type, category, city) {
    if (city === undefined || city === null) {
      return this.findServicesByLocation(type, category, 10000)
    }

    return this.findServicesByCity(type, category, city, 10000);
  }

  private findServicesByCity(type, category, city, range) {
    return this.api.call(`/v1/cities/${city}/${type}/${category}?range=${range}`);
  }

  private findServicesByLocation(type, category, range) {
    return this.locationProvider.getUserLocation().then((location: any) => {
      let url = `/v1/${type}/${category}/long/${location.longitude}/lat/${location.latitude}?range=${range}`;
      return this.api.call(url);
    });
  }
}

import {Injectable} from "@angular/core";
import {ApiService} from "./api-service";


@Injectable()
export class ContentService {

  constructor(public api: ApiService) { }

  findServiceCategories() {
    return this.api.call(`/service-categories/`);
  }

  findStandardServices(category, latitude, longitude) {
    if (latitude !== undefined && longitude !== undefined) {
      let url = `/categorised-service-providers/show/${category}/long/${longitude}/lat/${latitude}`;
      console.log(url);
      return this.api.call(url);
    }
    return this.api.call(`/categorised-service-providers/show/${category}`);
  }

  findTimetabledServices(category, latitude, longitude) {
    if (latitude !== undefined && longitude !== undefined) {
      let url = `/timetabled-service-providers/show/${category}/long/${longitude}/lat/${latitude}`;
      console.log(url);
      return this.api.call(url);
    }
    return this.api.call(`/timetabled-service-providers/show/${category}`);
  }

  findOrganisations() {
    return this.api.call('/service-providers/');
  }

  findOrganisationBySlug(slug) {
    return this.api.call(`/service-providers/show/${slug}`);
  }
}

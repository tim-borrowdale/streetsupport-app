import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class ContentService {

  static get parameters() {
    return [[Http]];
  }

  constructor(http) {
    this.http = http;
    this.data = null;
  }

  findServiceCategories() {
    return this.handleApiCall("https://live-api-streetsupport.azurewebsites.net/v2/service-categories/");
  }

  findStandardServices(category, latitude, longitude) {
    return this.handleApiCall(`https://live-api-streetsupport.azurewebsites.net/v2/categorised-service-providers/show/${category}/long/${longitude}/lat/${latitude}`);
  }

  findTimetabledServices(category, latitude, longitude) {
    return this.handleApiCall(`https://live-api-streetsupport.azurewebsites.net/v2/timetabled-service-providers/show/${category}/long/${longitude}/lat/${latitude}`);
  }

  findOrganisations() {
    return this.handleApiCall("https://live-api-streetsupport.azurewebsites.net/v2/service-providers/");
  }

  findOrganisationBySlug(slug) {
    return this.handleApiCall("https://live-api-streetsupport.azurewebsites.net/v2/service-providers/show/");
  }

  handleApiCall(url) {
    return this.http.get(url)
      .map(res => res.json())
      .catch(this.handleError);
  }

  handleError(error) {
    return Observable.throw(error.json().error || 'Server error');
  }
}

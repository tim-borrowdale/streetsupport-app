import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {API_BASE_URL} from "../constants";


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
    return this.handleApiCall(`${API_BASE_URL}/service-categories/`);
  }

  findStandardServices(category, latitude, longitude) {
    return this.handleApiCall(`${API_BASE_URL}/categorised-service-providers/show/${category}/long/${longitude}/lat/${latitude}`);
  }

  findTimetabledServices(category, latitude, longitude) {
    return this.handleApiCall(`${API_BASE_URL}/timetabled-service-providers/show/${category}/long/${longitude}/lat/${latitude}`);
  }

  findOrganisations() {
    return this.handleApiCall(`${API_BASE_URL}/service-providers/`);
  }

  findOrganisationBySlug(slug) {
    return this.handleApiCall(`${API_BASE_URL}/service-providers/show/${slug}`);
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

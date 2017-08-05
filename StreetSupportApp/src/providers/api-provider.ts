import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {API_BASE_URL} from "../constants";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ApiProvider {

  constructor(public http: Http) { }

  call(url): Promise<any> {

    return this.http.get(`${API_BASE_URL}${url}`)
     .toPromise()
     .then(this.mapResponse)
     .catch(this.handleError);
  }

  private mapResponse(response): Promise<any> {
    var jsonResponse;
    try {
      jsonResponse = response.json();
    } catch(error) {
      jsonResponse = {};
    }

    return Promise.resolve(jsonResponse);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}

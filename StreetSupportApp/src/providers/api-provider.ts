import {Injectable} from "@angular/core";
import { Http } from '@angular/http';
import {API_BASE_URL} from "../constants";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ApiProvider {

  constructor(public http: Http) { }

  call(url): Promise<any> {
    console.log(`${API_BASE_URL}${url}`);
    return this.http.get(`${API_BASE_URL}${url}`)
     .toPromise()
     .then(this.mapResponse)
     .catch(this.handleError);
  }

  private mapResponse(response): Promise<any> {
    return response.json();
  }

  private handleError(error: any): Promise<any> {
    console.log(error);
    return Promise.reject(error.message || error);
  }
}

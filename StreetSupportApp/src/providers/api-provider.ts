import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';
import { API_BASE_URL } from "../constants";
import 'rxjs/add/operator/toPromise';
import { AuthProvider } from '../providers/auth0-provider'


@Injectable()
export class ApiProvider {

  constructor(
    private http: Http,
    private auth: AuthProvider
  ) { }

  // obsolete, use get()
  call(url): Promise<any> {
    console.log(`${API_BASE_URL}${url}`);
    return this.http.get(`${API_BASE_URL}${url}`)
      .toPromise()
      .then(this.mapResponse)
      .catch(this.handleError);
  }

  get(url): Promise<any> {
    console.log(this.auth)
    const options = this.auth.loggedIn
      ? { headers: this.getAuthHeaders() }
      : null
    console.log(options)
    return this.http.get(`${API_BASE_URL}${url}`, options )
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

  getAuthHeaders():Headers  {
    const headers = new Headers()
    headers.append('Authorization', `Bearer ${this.auth.idToken}`)
    return headers
  }
}

import { Injectable } from "@angular/core";
import { ApiProvider } from "../api-provider";
import { LocationProvider } from "../location-provider";


@Injectable()
export class NeedsProvider {
  constructor (
    public api: ApiProvider,
    public locationProvider: LocationProvider) { }

  getNeeds (): any {
    return this.api.get('/v2/service-provider-needs?pageSize=100')
      .then((result) => {
        return result.items
      })
  }

  getResponses (): any {
    return this.api.get('/v2/service-provider-needs/responses?pageSize=100')
      .then((result) => {
        return result.items
      })
  }
}

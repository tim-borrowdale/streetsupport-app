import { Component, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationProvider } from '../../providers/location-provider';
import { SettingsPage } from '../../pages/settings/settings';

@Component({
  selector: 'ion-header',
  templateUrl: 'header.html'
})
export class HeaderComponent {
  public currentPage: string;

  constructor(
    private nav: NavController,
    private locationProvider: LocationProvider
  ) {
    const activeNav = this.nav.getActive()
    this.locationProvider.getCurrentCity()
      .then(city => {
        if (city === null && !activeNav) {
          this.gotoSettings()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  gotoSettings() {
    this.nav.push(SettingsPage)
  }

  get shouldDisplaySettingsLink() {
    const activeNav = this.nav.getActive()
    if (activeNav) {
      return activeNav.component.name !== 'SettingsPage'
    }
  }

  get shouldShowSSNLogo() {
    return this.nav.length() === 1
  }
}

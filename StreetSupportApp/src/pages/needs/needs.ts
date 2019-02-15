import { Component } from "@angular/core";
import { Loading, NavController, LoadingController } from "ionic-angular";
import { NeedsProvider } from "../../providers/resources/needs-provider";

@Component({
  templateUrl: 'needs.html'
})

export class NeedsPage {
  public needs: any;
  public loader: Loading;

  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public needsProvider: NeedsProvider
  ) {
    this.loader = this.loadingCtrl.create({ content: "Please wait..." });
  }

  ionViewWillEnter() {
    this.loadNeeds()
  }

  loadNeeds() {
    this.loader.present();
    this.needsProvider.getNeeds()
      .then((needs) => {
        this.needs = needs
        this.loader.dismiss()
      })
  }

  itemTapped(event, provider) {
    // this.nav.push(OrganisationPage, { item: provider.key });
  }
}

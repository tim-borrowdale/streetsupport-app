import { Component } from "@angular/core";
import { Loading, NavController, LoadingController } from "ionic-angular";
import { NeedsProvider } from "../../providers/resources/needs-provider";
import { NeedResponsePage } from '../need-responses/need-responses';

import { htmlDecode } from 'htmlencode'
@Component({
  templateUrl: 'needs.html'
})

export class NeedsPage {
  private needs: any;
  private responses: any;
  public mungedNeeds: any;
  public loader: Loading;

  private areNeedsRetrieved: boolean;
  private areResponsesRetrieved: boolean;

  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public needsProvider: NeedsProvider
  ) {
  }

  ionViewWillEnter() {
    this.loadNeeds()
  }

  loadNeeds() {
    this.loader = this.loadingCtrl.create({ content: "Please wait..." });
    this.loader.present();
    this.areNeedsRetrieved = false;
    this.areResponsesRetrieved = false;

    this.needsProvider.getNeeds()
      .then((needs) => {
        this.needs = needs
        this.areNeedsRetrieved = true
        this.checkAllLoaded()
      })
    this.needsProvider.getResponses()
      .then((responses) => {
        this.responses = responses
        this.areResponsesRetrieved = true
        this.checkAllLoaded()
      })
  }

  checkAllLoaded() {
    if (this.areNeedsRetrieved && this.areResponsesRetrieved) {
      this.mungedNeeds = this.needs
        .map((n) => {
          const responses = this.responses
            .filter((r) => r.needId === n.id)
            .map((r) => {
              return {
                ...r,
                formattedCreationDate: new Date(r.creationDate).toLocaleDateString(),
                mailLink: `mailto:${r.email}?subject=Thanks for your offer to help with "${htmlDecode(n.description)}"`
              }
            })
          return {
            ...n,
            responses: responses,
            hasResponses: responses.length > 0,
            responsesLabel: responses.length === 1
              ? `${responses.length} response`
              : `${responses.length} responses`
          }
        })
      this.loader.dismiss()
    }
  }

  itemTapped(event, need) {
    console.log({need})
    if (need.hasResponses) {
      this.nav.push(NeedResponsePage, { need: need });
    }
  }
}

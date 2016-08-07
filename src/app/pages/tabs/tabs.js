import {Component} from "@angular/core"
import {FindHelpPage} from '../find-help/find-help';
import {OrganisationListPage} from '../organisation-list/organisation-list';
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';


@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  constructor() {
    this.tab1Root = HomePage;
    this.tab2Root = FindHelpPage;
    this.tab3Root = OrganisationListPage;
    this.tab4Root = AboutPage;
  }
}

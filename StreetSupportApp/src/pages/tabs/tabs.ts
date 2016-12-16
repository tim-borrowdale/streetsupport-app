import {Component} from "@angular/core";
import {FindHelpPage} from '../find-help/find-help'
import {OrganisationListPage} from '../organisation-list/organisation-list';
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = HomePage;
  tab2Root: any = FindHelpPage;
  tab3Root: any = OrganisationListPage;
  tab4Root: any = AboutPage;
  

  constructor() {
  }
}

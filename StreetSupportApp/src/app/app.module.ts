import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiService } from '../services/api-service';
import { ContentService } from '../services/content-service';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContentPage } from '../pages/default-content/default-content';
import { EmergencyPage } from '../pages/emergency/emergency';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { FindHelpPage } from '../pages/find-help/find-help';
import { HelpCategoryPage } from '../pages/help-category/help-category';
import { HelpCategoryDetailPage } from '../pages/help-category-detail/help-category-detail';
import { OrganisationPage } from '../pages/organisation/organisation';
import { OrganisationListPage } from '../pages/organisation-list/organisation-list';
import { OrganisationServicePage } from '../pages/organisation-service/organisation-service';
import { TimetabledCategoryPage } from '../pages/timetabled-category/timetabled-category';
import { TimetabledCategoryDetailPage } from '../pages/timetabled-category-detail/timetabled-category-detail';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    ContentPage,
    EmergencyPage,
    FindHelpPage,
    HelpCategoryPage,
    HelpCategoryDetailPage,
    OrganisationPage,
    OrganisationListPage,
    OrganisationServicePage,
    TimetabledCategoryPage,
    TimetabledCategoryDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    ContentPage,
    EmergencyPage,
    FindHelpPage,
    HelpCategoryPage,
    HelpCategoryDetailPage,
    OrganisationPage,
    OrganisationListPage,
    OrganisationServicePage,
    TimetabledCategoryPage,
    TimetabledCategoryDetailPage
  ],
  providers: [
    Storage,
    ApiService,
    ContentService
  ]
})
export class AppModule {}

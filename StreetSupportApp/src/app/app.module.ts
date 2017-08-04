import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { LocationProvider } from '../providers/location-provider';
import { ApiProvider } from '../providers/api-provider';
import { ContentProvider } from '../providers/content-provider';
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
import { HeaderComponent } from '../components/header/header';
import { SortByOrder } from '../pipes/sort-by-order';
import { SortByAlpha } from '../pipes/sort-by-alpha';
import { SortByDay } from '../pipes/sort-by-day';
import { SortByOpeningTime } from '../pipes/sort-by-opening-time';

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
    TimetabledCategoryDetailPage,
    HeaderComponent,
    SortByOrder,
    SortByAlpha,
    SortByDay,
    SortByOpeningTime
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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage,
    ApiProvider,
    ContentProvider,
    LocationProvider
  ]
})
export class AppModule {}

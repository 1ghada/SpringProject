import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { BadgesComponent } from './components/badges/badges.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { CardsComponent } from './components/cards/cards.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ChartsApexchartsComponent } from './components/charts-apexcharts/charts-apexcharts.component';
import { ChartsChartjsComponent } from './components/charts-chartjs/charts-chartjs.component';
import { FormsEditorsComponent } from './components/forms-editors/forms-editors.component';
import { FormsElementsComponent } from './components/forms-elements/forms-elements.component';
import { FormsLayoutsComponent } from './components/forms-layouts/forms-layouts.component';
import { IconsBootstrapComponent } from './components/icons-bootstrap/icons-bootstrap.component';
import { IconsBoxiconsComponent } from './components/icons-boxicons/icons-boxicons.component';
import { IconsRemixComponent } from './components/icons-remix/icons-remix.component';
import { ListGroupComponent } from './components/list-group/list-group.component';
import { ModalComponent } from './components/modal/modal.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SpinnersComponent } from './components/spinners/spinners.component';
import { TablesDataComponent } from './components/tables-data/tables-data.component';
import { TablesGeneralComponent } from './components/tables-general/tables-general.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesFaqComponent } from './pages/pages-faq/pages-faq.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/pages-login', pathMatch: 'full' },
  
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard]},
  { path: 'alerts', component: AlertsComponent, canActivate: [AuthGuard] },
  { path: 'accordion/:id', component: AccordionComponent, canActivate: [AuthGuard] },
  { path: 'badges/:id', component: BadgesComponent, canActivate: [AuthGuard] },
  { path: 'breadcrumbs', component: BreadcrumbsComponent, canActivate: [AuthGuard] },
  { path: 'buttons', component: ButtonsComponent, canActivate: [AuthGuard] },
  { path: 'cards/:id', component: CardsComponent, canActivate: [AuthGuard] },
  { path: 'carousel/:id', component: CarouselComponent, canActivate: [AuthGuard] },
  { path: 'charts-apexcharts', component: ChartsApexchartsComponent, canActivate: [AuthGuard] },
  { path: 'charts-chartjs', component: ChartsChartjsComponent, canActivate: [AuthGuard] },
  { path: 'form-editors', component: FormsEditorsComponent, canActivate: [AuthGuard] },
  { path: 'form-elements', component: FormsElementsComponent, canActivate: [AuthGuard] },
  { path: 'form-layouts', component: FormsLayoutsComponent, canActivate: [AuthGuard] },
  { path: 'icons-bootstrap', component: IconsBootstrapComponent, canActivate: [AuthGuard] },
  { path: 'icons-boxicons', component: IconsBoxiconsComponent, canActivate: [AuthGuard] },
  { path: 'icons-remix', component: IconsRemixComponent, canActivate: [AuthGuard] },
  { path: 'list-group', component: ListGroupComponent , canActivate: [AuthGuard]},
  { path: 'modal', component: ModalComponent , canActivate: [AuthGuard]},
  { path: 'pagination', component: PaginationComponent, canActivate: [AuthGuard] },
  { path: 'progress', component: ProgressComponent, canActivate: [AuthGuard] },
  { path: 'spinners', component: SpinnersComponent, canActivate: [AuthGuard] },
  { path: 'tables-data', component: TablesDataComponent , canActivate: [AuthGuard]},
  { path: 'tables-general', component: TablesGeneralComponent, canActivate: [AuthGuard] },
  { path: 'tabs', component: TabsComponent , canActivate: [AuthGuard]},
  { path: 'tooltips', component: TooltipsComponent, canActivate: [AuthGuard] },
  { path: 'pages-blank', component: PagesBlankComponent, canActivate: [AuthGuard] },
  { path: 'pages-contact', component: PagesContactComponent, canActivate: [AuthGuard] },
  { path: 'pages-error404', component: PagesError404Component, canActivate: [AuthGuard] },
  { path: 'pages-faq', component: PagesFaqComponent, canActivate: [AuthGuard] },
  { path: 'pages-login', component: PagesLoginComponent },
  { path: 'pages-register', component: PagesRegisterComponent },
  { path: 'user-profile', component: UsersProfileComponent , canActivate: [AuthGuard]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

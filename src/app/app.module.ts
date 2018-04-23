import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TopnavComponent } from './topnav/topnav.component';
import { CategoryNewsComponent } from './news/category-news/category-news.component';
import { BreakingNewsComponent } from './news/breaking-news/breaking-news.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiConnectionService } from './shared/services/apiconnection.service';
import { BreakingNewsArticleComponent } from './news/breaking-news/breaking-news-article/breaking-news-article.component';
import { CategoryNewsArticleComponent } from './news/category-news/category-news-article/category-news-article.component';
import { SourceComponent } from './source/source.component';
import { RouterModule, Routes } from '@angular/router';
import { ArticleSharingService } from './shared/services/article-sharing.service';
import { SafePipe } from './shared/Pipes/safe-pipe';
import { TemperatureConverterPipe } from './shared/Pipes/temperature-converter-pipe';
import { DashboardArticleComponent } from './dashboard/dashboard-article/dashboard-article.component';
import {TimeAgoPipe} from 'time-ago-pipe';
import { LoopDirective } from './shared/custom-directives/loop-directive.directive';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBoxComponent } from './shared/search-box/search-box.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material/material.module';
import { UpperCasePipe, CommonModule } from '@angular/common';
import { CategoryHomeComponent } from './news/category-news/category-home/category-home.component';
import { SidenavMainComponent } from './sidenav/sidenav-main/sidenav-main.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { getAuthServiceConfigs } from '../socialloginConfig';
import { SocialLoginModule, AuthServiceConfig } from 'angular5-social-login';
import { SocialAuthService } from './shared/services/auth.service';
import { PlacesAPIService } from './shared/services/places-api.service';
import { UserDetailsComponent } from './user/user-details/user-details.component';
const appRoutes: Routes = [
  {path: 'TopUSNews', component: BreakingNewsComponent},
  {path: 'category/:id', component: CategoryNewsComponent},
  {path: 'Dashboard', component: DashboardComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'Details', component: UserDetailsComponent},
  {path: 'SignUp', component: SignupComponent},
  {path: '', redirectTo: '/Dashboard', pathMatch: 'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    SidenavComponent,
    TopnavComponent,
    CategoryNewsComponent,
    BreakingNewsComponent,
    BreakingNewsArticleComponent,
    CategoryNewsArticleComponent,
    SourceComponent,
    SafePipe,
    TemperatureConverterPipe,
    DashboardArticleComponent,
    TimeAgoPipe,
    LoopDirective,
    PaginationComponent,
    SearchBoxComponent,
    CategoryHomeComponent,
    SidenavMainComponent,
    LoginComponent,
    SignupComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule,
    SocialLoginModule
  ],
  providers: [
    ApiConnectionService, ArticleSharingService, {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}, {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }, SocialAuthService,
PlacesAPIService
],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ],
  exports: [
    LoopDirective
  ]
})
export class AppModule { }

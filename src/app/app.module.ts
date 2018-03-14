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
const appRoutes: Routes = [
  {path: 'TopUSNews', component: BreakingNewsComponent},
  {path: 'category/:id', component: CategoryNewsComponent},
  {path: 'Dashboard', component: DashboardComponent},
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
    SafePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(
      appRoutes, {enableTracing: true}
    )
  ],
  providers: [ApiConnectionService, ArticleSharingService],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }

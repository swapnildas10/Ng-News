import { Component, OnInit, HostBinding, ViewChild, ElementRef, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConnectionService } from '../shared/services/apiconnection.service';
import { WeatherWrapper, CurrentWeather, WeatherCoordinate } from '../shared/modals/weather';
import { TopHeadlines } from '../shared/modals/top-headlines';
import { Article } from '../shared/modals/article';
import { ModalDirective } from 'angular-bootstrap-md';
import { CompanyLogo } from '../shared/modals/company-logo';
import { DomainLogo } from '../shared/modals/domain-logo';
import { ArticleSource } from '../shared/modals/article-source';
import { SearchQueryModal } from '../shared/modals/searchquerymodal';
import { SearchBoxQueryParameters } from '../shared/modals/searchboxquery-modal';
import { Subject } from 'rxjs/Subject';
import { MatTab, MatTabGroup, MatTabChangeEvent } from '@angular/material';
import { SocialAuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  weatherWrapper: WeatherWrapper;
  weatherCoordinate: WeatherCoordinate;
  topHeadlines: TopHeadlines;
  currentWeather: CurrentWeather;
  article: Article;
  queryResults: SearchQueryModal;
  queryArticle: Article;
  onQueryDisplay = false;
  pageClicked: number;
  pageNumberChanged = new Subject<number>();
  MatTabClicked = new Subject<number>();
  searchBoxQueryParameters: SearchBoxQueryParameters;
  @ViewChild('demoBasic') modal: ModalDirective;
  @ViewChild('MatTabAdd') MatTabAdd: MatTab;
  @ViewChild('matTabGroup') matTabGroup: MatTabGroup;
  constructor(
    private router: Router,
    private apiConnectionService: ApiConnectionService,
    public authService: SocialAuthService
  ) { }
  isCompanyLogo(input: any): input is CompanyLogo {
    return input.constructor.name === 'CompanyLogo';
  }
  isDomainLogo(input: any): input is DomainLogo {
    return input.constructor.name === 'DomainLogo';
  }


  ngOnInit() {
    this.getGeoLocation();
    this.matTabGroup.selectChange.subscribe((response) => {
      console.log((<MatTab>(response.tab)));
      console.log(this.matTabGroup._tabs.length);
    });
    this.pageClicked = 1;
    this.pageNumberChanged.asObservable().distinctUntilChanged();
    this.apiConnectionService.getBreakingNewsfromAPI('us', null, null, null, 30, 1).subscribe(
      response => {
        this.topHeadlines = response.body;
        this.topHeadlines.articles.forEach(element => {
          if (!element.source.name.includes('.')) {
            this.apiConnectionService.getCompanyLogo(decodeURIComponent(element.source.name)).subscribe(
              logo => {
                element.companyLogo = logo.body;
              }
            );
          } else {
            this.apiConnectionService.getCompanyLogoByDomain(decodeURIComponent(element.source.name)).subscribe(
              logo => {
                element.domainLogo = logo.body;
              }
            );
          }
        });
      }
    );
    this.pageNumberChanged.subscribe(
      (pageNo) => {
        console.log(pageNo);
        if (this.onQueryDisplay) {
          this.apiConnectionService.getQueryResultfromAPI(this.searchBoxQueryParameters.Query, this.searchBoxQueryParameters.Publishers,
            null, this.searchBoxQueryParameters.FromDate, this.searchBoxQueryParameters.ToDate, this.searchBoxQueryParameters.Language,
            this.searchBoxQueryParameters.SortBy, 20, pageNo).subscribe(
              (response) => {
                this.queryResults = response.body;
                console.log(this.queryResults);
              }
            );
        }
      }
    );
  }
getGeoLocation() {
  navigator.geolocation.getCurrentPosition(function(success) {
   this.apiConnectionService.getCurrentWeatherDataByCoordAPI(success.coords.latitude, success.coords.longitude).subscribe(
     (response) => {
      this.weatherCoordinate = response.body;
      this.apiConnectionService.getWeatherDataByCityIdAPI(this.weatherCoordinate.id).subscribe(
        (response1) => {
          this.weatherWrapper = response1.body;
        }
      );
      console.log(response.body);
     }
   );
    }.bind(this), function(error) {
      this.apiConnectionService.getCurrentWeatherDataByZipCodeAPI().subscribe(
        response => {
          this.currentWeather = response.body;
          this.apiConnectionService.getWeatherDataByZipCodeAPI().subscribe(  // edit this
            response1 => {
              this.weatherWrapper = response1.body;
            }
          );
          console.log(error);
        }
      );
    }.bind(this));
}
  initiateModal(event: Boolean) {
    if (event) {
     this.modal.show();
    }
  }
  displayArticleOnModal(event: Article) {
this.article = event;
  }
  onHidden() {
    this.article = null;
  }
  onPageClick(event: number) {
if (this.pageClicked !== event) {
  this.pageClicked = event;
  this.pageNumberChanged.next(event);
}


  }
  searchResults( results: SearchQueryModal) {
  }
  searchResult( result: Article) {
    this.queryArticle = result;
  }
  enableQueryResultDisplay(onDisplay: boolean) {
    this.onQueryDisplay = onDisplay;
    if (!onDisplay) {
      this.queryResults = null;
    }
  }
  pageCalculate(totalArticles) {
    return  Math.ceil(totalArticles / 20);
  }

  fetchQueryResults() {

  }
  fetchQueryParameters($event: SearchBoxQueryParameters) {
    this.searchBoxQueryParameters = $event;
    this.apiConnectionService.getQueryResultfromAPI($event.Query, $event.Publishers,
      null, $event.FromDate, $event.ToDate, $event.Language, $event.SortBy, 20, this.pageClicked).subscribe(
        (response) => {
          this.queryResults = response.body;
        }
      );
  }
}

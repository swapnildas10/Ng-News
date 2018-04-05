import { Component, OnInit, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConnectionService } from '../shared/services/apiconnection.service';
import { WeatherWrapper, CurrentWeather } from '../shared/modals/weather';
import { TopHeadlines } from '../shared/modals/top-headlines';
import { Article } from '../shared/modals/article';
import { ModalDirective } from 'angular-bootstrap-md';
import { CompanyLogo } from '../shared/modals/company-logo';
import { DomainLogo } from '../shared/modals/domain-logo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  weatherWrapper: WeatherWrapper;
  topHeadlines: TopHeadlines;
  currentWeather: CurrentWeather;
  article: Article;
  @ViewChild('demoBasic') modal: ModalDirective;
  constructor(
    private router: Router,
    private apiConnectionService: ApiConnectionService
  ) { }
  isCompanyLogo(input: any): input is CompanyLogo {
    return input.constructor.name === 'CompanyLogo';
  }
  isDomainLogo(input: any): input is DomainLogo {
    return input.constructor.name === 'DomainLogo';
  }


  ngOnInit() {
    // this.apiConnectionService.getWeatherDataByZipCodeAPI().subscribe(
    //   response => {
    //     this.weatherWrapper = response.body;
    //   }
    // );
    // this.apiConnectionService.getBreakingNewsfromAPI('us', null, null, null, 30, 1).subscribe(
    //   response => {
    //     this.topHeadlines = response.body;
    //     this.topHeadlines.articles.forEach(element => {
    //       if (!element.source.name.includes('.')) {
    //         this.apiConnectionService.getCompanyLogo(decodeURIComponent(element.source.name)).subscribe(
    //           logo => {
    //             element.companyLogo = logo.body;
    //           }
    //         );
    //       } else {
    //         this.apiConnectionService.getCompanyLogoByDomain(decodeURIComponent(element.source.name)).subscribe(
    //           logo => {
    //             element.domainLogo = logo.body;
    //           }
    //         );
    //       }
    //     });
    //   }
    // );
    // this.apiConnectionService.getCurrentWeatherDataByZipCodeAPI().subscribe(
    //   response => {
    //     this.currentWeather = response.body;
    //   }
    // );
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
console.log(event);
  }
}

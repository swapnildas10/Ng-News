import { Component, OnInit, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConnectionService } from '../shared/services/apiconnection.service';
import { WeatherWrapper, CurrentWeather } from '../shared/modals/weather';
import { TopHeadlines } from '../shared/modals/top-headlines';
import { Article } from '../shared/modals/article';
import { ModalDirective } from 'angular-bootstrap-md';

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

  ngOnInit() {
    this.apiConnectionService.getWeatherDataByZipCodeAPI().subscribe(
      response => {
        this.weatherWrapper = response.body;
      }
    );
    this.apiConnectionService.getBreakingNewsfromAPI('us', null, null, null, 30, 1).subscribe(
      response => {
        this.topHeadlines = response.body;
        console.log(this.topHeadlines.totalResults);
      }
    );
    this.apiConnectionService.getCurrentWeatherDataByZipCodeAPI().subscribe(
      response => {
        this.currentWeather = response.body;
      }
    );
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

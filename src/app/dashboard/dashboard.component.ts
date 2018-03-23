import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConnectionService } from '../shared/services/apiconnection.service';
import { WeatherWrapper } from '../shared/modals/weather';
import { TopHeadlines } from '../shared/modals/top-headlines';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  weatherWrapper: WeatherWrapper;
  topHeadlines: TopHeadlines;
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
    this.apiConnectionService.getBreakingNewsfromAPI(null, 'business').subscribe(
      response => {
        this.topHeadlines = response.body;
      }
    );
  }

}

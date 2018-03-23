import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConnectionService } from '../shared/services/apiconnection.service';
import { WeatherWrapper } from '../shared/modals/weather';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  weatherWrapper: WeatherWrapper;
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
  }

}

import { Component, OnInit } from '@angular/core';
import { ApiConnectionService } from '../../shared/services/apiconnection.service';

@Component({
  selector: 'app-breaking-news',
  templateUrl: './breaking-news.component.html',
  styleUrls: ['./breaking-news.component.scss']
})
export class BreakingNewsComponent implements OnInit {

  constructor(private apiConnectionService: ApiConnectionService) { }
  private newsData: any;
  ngOnInit() {
    this.getBreakingNewsData();
  }
  getBreakingNewsData() {
    this.apiConnectionService.getBreakingNewsfromAPI().subscribe(
      (response: any) => {
        // this.newsData = response.map(key =>
        //   `${key}: ${response.headers.get(key)}`);
        this.newsData = {
        status : response.body['status'],
        totalresults: response.body['totalResults'],
        articles: response.body['articles']
       };
       console.log(this.newsData);
      }
    );
  }
}

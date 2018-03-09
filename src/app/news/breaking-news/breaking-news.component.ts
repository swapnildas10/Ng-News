import { Component, OnInit } from '@angular/core';
import { ApiConnectionService } from '../../shared/services/apiconnection.service';
import { Article } from '../../shared/modals/article';
import { TopHeadlines } from '../../shared/modals/top-headlines';

@Component({
  selector: 'app-breaking-news',
  templateUrl: './breaking-news.component.html',
  styleUrls: ['./breaking-news.component.scss']
})
export class BreakingNewsComponent implements OnInit {

  constructor(private apiConnectionService: ApiConnectionService) { }
  private newsData: TopHeadlines;
  ngOnInit() {
    this.getBreakingNewsData();
  }
  getBreakingNewsData() {
    this.apiConnectionService.getBreakingNewsfromAPI().subscribe(
      (response) => {
        // this.newsData = response.map(key =>
        //   `${key}: ${response.headers.get(key)}`);
        this.newsData = response.body;
       console.log(this.newsData);
      }
    );
  }
}

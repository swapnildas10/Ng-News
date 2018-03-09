import { Component, OnInit } from '@angular/core';
import { ApiConnectionService } from '../../shared/services/apiconnection.service';
import { Article } from '../../shared/modals/article';
import { TopHeadlines } from '../../shared/modals/top-headlines';
import { Source, SourceWrapper } from '../../shared/modals/source';

@Component({
  selector: 'app-breaking-news',
  templateUrl: './breaking-news.component.html',
  styleUrls: ['./breaking-news.component.scss']
})
export class BreakingNewsComponent implements OnInit {

  constructor(private apiConnectionService: ApiConnectionService) { }
   newsData: TopHeadlines;
  private sourceData: SourceWrapper;
  ngOnInit() {
    this.getBreakingNewsData();
  }
  getBreakingNewsData() {
    this.apiConnectionService.getBreakingNewsfromAPI('us', null, null, null, 5).subscribe(
      (response) => {
        // this.newsData = response.map(key =>
        //   `${key}: ${response.headers.get(key)}`);
        this.newsData = response.body;
      }
    );
  }


  getSources(category: string = null, language: string = null, country: string = null) {
    this.apiConnectionService.getSourcesfromAPI(category, language, country).subscribe(
      (response) => {
        // this.newsData = response.map(key =>
        //   `${key}: ${response.headers.get(key)}`);
        this.sourceData = response.body;
       console.log(this.sourceData);
      }
    );
  }
}

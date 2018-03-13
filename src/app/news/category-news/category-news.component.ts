import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ApiConnectionService } from '../../shared/services/apiconnection.service';
import { SearchQueryModal } from '../../shared/modals/searchquerymodal';
import { TopHeadlines } from '../../shared/modals/top-headlines';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../shared/modals/article';
import { ArticleSharingService } from '../../shared/services/article-sharing.service';


@Component({
  selector: 'app-category-news',
  templateUrl: './category-news.component.html',
  styleUrls: ['./category-news.component.scss']
})
export class CategoryNewsComponent implements OnInit, OnChanges {
responseData: TopHeadlines;
TopFive;
@Output() topArticlesByCategory = new EventEmitter<Article[]>();
 category: string;
  constructor(
    private apiConnectionService: ApiConnectionService,
    private articlesSharingService: ArticleSharingService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('id');
    this.getCategoryNewsData(this.category);
  }
ngOnChanges(changes: SimpleChanges) {
// this.getCategoryNewsData(changes.category.currentValue);
}
  getCategoryNewsData(category: string) {
   // console.log(inputcategory);
    this.apiConnectionService.getTopNewsByCategoryfromAPI('us', category, null, null, 10, 1).subscribe(
      (response) => {
        // this.newsData = response.map(key =>
        //   `${key}: ${response.headers.get(key)}`);
        this.responseData = response.body;
        this.TopFive = this.responseData.articles.splice(0, 5);
        this.articlesSharingService.shareArticleByCategory(this.responseData.articles.slice(0, 3));
        this.articlesSharingService.shareTotalArticle(this.responseData.totalResults);
      }
    );
  }


}

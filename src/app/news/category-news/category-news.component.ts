import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ApiConnectionService } from '../../shared/services/apiconnection.service';
import { SearchQueryModal } from '../../shared/modals/searchquerymodal';
import { TopHeadlines } from '../../shared/modals/top-headlines';

@Component({
  selector: 'app-category-news',
  templateUrl: './category-news.component.html',
  styleUrls: ['./category-news.component.scss']
})
export class CategoryNewsComponent implements OnInit, OnChanges {
responseData: TopHeadlines;
@Input() category;
  constructor(private apiConnectionService: ApiConnectionService) { }
  ngOnInit() {
    this.getCategoryNewsData(this.category);
  }
ngOnChanges(changes: SimpleChanges) {
// this.getCategoryNewsData(changes.category.currentValue);
}
  getCategoryNewsData(category: string) {
   // console.log(inputcategory);
    this.apiConnectionService.getTopNewsByCategoryfromAPI('us', category, null, null, 5).subscribe(
      (response) => {
        // this.newsData = response.map(key =>
        //   `${key}: ${response.headers.get(key)}`);
        this.responseData = response.body;
      }
    );
  }


}

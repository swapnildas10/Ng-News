import { Component, OnInit, Input } from '@angular/core';
import { TopHeadlines } from '../../../shared/modals/top-headlines';
import { Article } from '../../../shared/modals/article';

@Component({
  selector: 'app-category-news-article',
  templateUrl: './category-news-article.component.html',
  styleUrls: ['./category-news-article.component.scss']
})
export class CategoryNewsArticleComponent implements OnInit {
@Input() article: Article;
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
@Output() outArticle = new EventEmitter<Article>();
@Output() showModal = new EventEmitter<Boolean>();
  ngOnInit() {
  }

  onClickEmit() {
    this.outArticle.emit(this.article);
    this.showModal.emit(true);
  }
}

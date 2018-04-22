import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '../../../shared/modals/article';

@Component({
  selector: 'app-breaking-news-article',
  templateUrl: './breaking-news-article.component.html',
  styleUrls: ['./breaking-news-article.component.scss']
})
export class BreakingNewsArticleComponent implements OnInit {
  @Input() article: Article;
  @Output() outArticle = new EventEmitter<Article>();
  @Output() showModal = new EventEmitter<Boolean>();
  constructor() { }

  ngOnInit() {
  }
  onClickEmit() {
    console.log(this.article);
    this.outArticle.emit(this.article);
    this.showModal.emit(true);
  }
}

import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Article } from '../../shared/modals/article';

@Component({
  selector: 'app-dashboard-article',
  templateUrl: './dashboard-article.component.html',
  styleUrls: ['./dashboard-article.component.scss']
})
export class DashboardArticleComponent implements OnInit {
@Input() article: Article;
@Output() initiate = new EventEmitter<boolean>();
@Output() outArticle = new EventEmitter<Article>();
  constructor() { }

  ngOnInit() {
  }
onclickEmit() {
  this.initiate.emit(true);
  this.outArticle.emit(this.article);
}
}

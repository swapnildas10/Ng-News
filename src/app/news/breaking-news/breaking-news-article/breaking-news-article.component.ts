import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../../shared/modals/article';

@Component({
  selector: 'app-breaking-news-article',
  templateUrl: './breaking-news-article.component.html',
  styleUrls: ['./breaking-news-article.component.scss']
})
export class BreakingNewsArticleComponent implements OnInit {
  @Input() article: Article;
  constructor() { }

  ngOnInit() {
  }

}

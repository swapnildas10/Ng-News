import { Component, OnInit, Output, Input } from '@angular/core';
import { Article } from '../../shared/modals/article';

@Component({
  selector: 'app-dashboard-article',
  templateUrl: './dashboard-article.component.html',
  styleUrls: ['./dashboard-article.component.scss']
})
export class DashboardArticleComponent implements OnInit {
@Input() article: Article;
  constructor() { }

  ngOnInit() {
  }

}

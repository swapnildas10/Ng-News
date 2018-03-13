import { Component, OnInit } from '@angular/core';
import { Article } from '../shared/modals/article';
import { ArticleSharingService } from '../shared/services/article-sharing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
articles: Article[];
  constructor(
    private articlesSharingService: ArticleSharingService
  ) { }

  ngOnInit() {
    this.articlesSharingService.articleObserved.subscribe(
      (articles: Article[]) => {
        this.articles = articles;
      }
    );
  }
}

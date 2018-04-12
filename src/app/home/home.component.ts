import { Component, OnInit } from '@angular/core';
import { Article } from '../shared/modals/article';
import { ArticleSharingService } from '../shared/services/article-sharing.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
articles: Article[];
totalPage: number;
routeparam: string;
toggleSideBarMain = false;
  constructor(
    private articlesSharingService: ArticleSharingService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.articlesSharingService.articleObserved.subscribe(
      (articles: Article[]) => {
        this.articles = articles;
      }
    );

    this.articlesSharingService.totalArticlesObserved.subscribe(
      (totalResults: number) => {
        this.totalPage = Math.ceil(totalResults / 20);
      }
    );
  }

  toggleSiddeNavBarMain(event) {
     this.toggleSideBarMain = event;
  }
}

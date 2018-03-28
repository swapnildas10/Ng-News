import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, Output, EventEmitter,
  HostListener, ViewChild } from '@angular/core';
import { ApiConnectionService } from '../../shared/services/apiconnection.service';
import { SearchQueryModal } from '../../shared/modals/searchquerymodal';
import { TopHeadlines } from '../../shared/modals/top-headlines';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../shared/modals/article';
import { ArticleSharingService } from '../../shared/services/article-sharing.service';
import { ModalDirective } from 'angular-bootstrap-md';


@Component({
  selector: 'app-category-news',
  templateUrl: './category-news.component.html',
  styleUrls: ['./category-news.component.scss']
})
export class CategoryNewsComponent implements OnInit, OnChanges {
responseData: TopHeadlines;
TopFive;
article: Article;
@Output() topArticlesByCategory = new EventEmitter<Article[]>();
@ViewChild('demoBasic') modal: ModalDirective;
 category: string;
 topnav; styleName;
 className = 'navbar navbar-expand-lg navbar-dark indigo';
  constructor(
    private apiConnectionService: ApiConnectionService,
    private articlesSharingService: ArticleSharingService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('id');
    this.getCategoryNewsData(this.category);
    this.topnav = (<HTMLInputElement>document.getElementsByTagName('nav')[0]);
  }
ngOnChanges(changes: SimpleChanges) {
// this.getCategoryNewsData(changes.category.currentValue);
}
onShowModal(event: Boolean) {
  if (event) {
    this.modal.show();
  }
}
onHidden() {
this.article = null;
}
onDisplayArticleOnModal(event: Article) {
  this.article = event;
}
  getCategoryNewsData(category: string) {
   // console.log(inputcategory);
    this.apiConnectionService.getTopNewsByCategoryfromAPI('us', category, null, null, 10, 1).subscribe(
      (response) => {
        // this.newsData = response.map(key =>
        //   `${key}: ${response.headers.get(key)}`);
        this.responseData = response.body;
        console.log(this.responseData.totalResults);
        this.TopFive = this.responseData.articles.splice(0, 5);
        this.articlesSharingService.shareArticleByCategory(this.responseData.articles.slice(0, 3));
        this.articlesSharingService.shareTotalArticle(this.responseData.totalResults);
      }
    );
  }
  @HostListener('window:scroll', ['$event'])
  onScrollEvent($event) {
    const number = $event.target.documentElement.scrollTop;
   const bottomnav = (<HTMLInputElement>document.getElementsByTagName('nav')[1]).getBoundingClientRect().top;
   if ((<HTMLInputElement>document.getElementById('navtop')).getBoundingClientRect().top <=
    ((<HTMLInputElement>document.getElementsByTagName('nav')[0]).offsetHeight +
    (<HTMLInputElement>document.getElementsByTagName('nav')[1]).offsetHeight)
   ) {
    (<HTMLInputElement>document.getElementsByTagName('nav')[1]).style.marginTop =
    (<HTMLInputElement>document.getElementsByTagName('nav')[0]).offsetHeight.toString() + 'px';
this.className = 'navbar navbar-expand-lg navbar-dark indigo fixed-top scrolling-navbar';
(<HTMLInputElement>document.getElementById('navtop')).style.paddingTop =

(+(<HTMLInputElement>document.getElementsByTagName('nav')[1]).offsetHeight).toString() + 'px';
   } else {
    (<HTMLInputElement>document.getElementsByTagName('nav')[1]).style.marginTop = '0';
    (<HTMLInputElement>document.getElementById('navtop')).style.paddingTop = '0';
    this.className = 'navbar navbar-expand-lg navbar-dark indigo';
   }

  }
}

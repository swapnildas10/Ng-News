import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, Output, EventEmitter,
  HostListener, ViewChild } from '@angular/core';
import { ApiConnectionService } from '../../shared/services/apiconnection.service';
import { SearchQueryModal } from '../../shared/modals/searchquerymodal';
import { TopHeadlines } from '../../shared/modals/top-headlines';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Article } from '../../shared/modals/article';
import { ArticleSharingService } from '../../shared/services/article-sharing.service';
import { ModalDirective } from 'angular-bootstrap-md';
import 'rxjs/add/operator/switchMap';

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
 categoryArtice$;
 articlesToDisplay: Article[];
 className = 'navbar navbar-expand-lg navbar-dark indigo';
  constructor(
    private apiConnectionService: ApiConnectionService,
    private articlesSharingService: ArticleSharingService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit() {
    this.categoryArtice$ = this.route.paramMap.switchMap((params: ParamMap) => {
      this.category = params.get('id');
     return this.apiConnectionService.getTopNewsByCategoryfromAPI('us', params.get('id'), null, null, 20, 1);
    });
     this.categoryArtice$.subscribe((response) => {
      // this.newsData = response.map(key =>
      //   `${key}: ${response.headers.get(key)}`);
      this.responseData = this.fetchArticlesfromResponse(response);
      this.TopFive = this.responseData.articles.splice(0, 5);
      this.articlesSharingService.shareArticleByCategory(this.responseData.articles.slice(0, 3));
      this.articlesSharingService.shareTotalArticle(this.responseData.totalResults);
    });
    this.topnav = (<HTMLInputElement>document.getElementsByTagName('nav')[0]);
  }
ngOnChanges(changes: SimpleChanges) {

// this.getCategoryNewsData(changes.category.currentValue);
}

fetchArticlesfromResponse(response: any) {
 const data = response.body;
 data.articles.forEach(element => {
        if (!element.source.name.includes('.')) {
          this.apiConnectionService.getCompanyLogo(decodeURIComponent(element.source.name)).subscribe(
            logo => {
              element.companyLogo = logo.body;
            }
          );
        } else {
          this.apiConnectionService.getCompanyLogoByDomain(decodeURIComponent(element.source.name)).subscribe(
            logo => {
              element.domainLogo = logo.body;
            }
          );
        }
      });
      return data;
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

  onPageClick(event: number) {
  this.apiConnectionService.getTopNewsByCategoryfromAPI('us', this.category, null, null, 20, event).subscribe(
    (response) => {
      this.responseData = this.fetchArticlesfromResponse(response);
    }
  );
  }

  pageCalculate(totalArticles) {
    console.log(Math.floor(totalArticles / 20));
    return  Math.floor(totalArticles / 20);
  }
}

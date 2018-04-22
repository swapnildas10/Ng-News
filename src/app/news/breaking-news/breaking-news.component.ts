import { Component, OnInit, ViewChild, Input, QueryList } from '@angular/core';
import { ApiConnectionService } from '../../shared/services/apiconnection.service';
import { Article } from '../../shared/modals/article';
import { TopHeadlines } from '../../shared/modals/top-headlines';
import { Source, SourceWrapper } from '../../shared/modals/source';
import { ModalDirective } from 'angular-bootstrap-md';
import { MatTabGroup, MatTabChangeEvent, MatTab } from '@angular/material';
import { SearchBoxQueryParameters } from '../../shared/modals/searchboxquery-modal';

@Component({
  selector: 'app-breaking-news',
  templateUrl: './breaking-news.component.html',
  styleUrls: ['./breaking-news.component.scss']
})
export class BreakingNewsComponent implements OnInit {

  constructor(private apiConnectionService: ApiConnectionService) { }
   newsData: TopHeadlines;
   article: Article;
  private sourceData: SourceWrapper;
  @ViewChild('demoBasic') modal: ModalDirective;
  @ViewChild('matTabGroup') matTabGroup: MatTabGroup;
  searchBoxQueryParameters: SearchBoxQueryParameters;
  tabs;
  @Input()
selectedIndex: number | null;
  ngOnInit() {
    this.matTabGroup.selectedIndex = 0;
     this.tabs = new QueryList<MatTab>();
     this.getBreakingNewsData(this.selectedIndex);
    this.matTabGroup.selectedTabChange.subscribe(
      (matTabChangeEvent: MatTabChangeEvent) => {
     this.selectedIndex =   matTabChangeEvent.index;
     console.log(this.selectedIndex);
     if (this.searchBoxQueryParameters) {
      this.getBreakingNewsData(this.selectedIndex, this.searchBoxQueryParameters.Query, null, null);
     } else {
      this.getBreakingNewsData(this.selectedIndex);
     }
      }
    );
  }

  getCategory(index: number): string {
    switch (index) {
      case 0:
      return 'general';
      case 1:
      return 'business';
      case 2:
      return 'entertainment';
      case 3:
      return 'health';
      case 4:
      return 'science';
      case 5:
      return 'technology';
      default:
      return null;
    }
  }
  getBreakingNewsData(index: number, query: string = null, pageSize = null, pageNumber = null) {
    this.apiConnectionService.getBreakingNewsfromAPI('us', this.getCategory(index), null, query, pageSize, pageNumber).subscribe(
      (response) => {
        // this.newsData = response.map(key =>
        //   `${key}: ${response.headers.get(key)}`);
        this.newsData = response.body;
        this.newsData.articles.forEach(element => {
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
      }
    );
  }


  getSources(category: string = null, language: string = null, country: string = null) {
    this.apiConnectionService.getSourcesfromAPI(category, language, country).subscribe(
      (response) => {
        // this.newsData = response.map(key =>
        //   `${key}: ${response.headers.get(key)}`);
        this.sourceData = response.body;
      }
    );
  }

  displayArticleOnModal(event: Article) {
    this.article = event;
  }

  initiateModal(event: Boolean) {
    if (event) {
    this.modal.show();
    }
  }
  onHidden() {
    this.article = null;
  }
  getQueryParameters(event: SearchBoxQueryParameters) {
    this.searchBoxQueryParameters = event;
    this.getBreakingNewsData(this.selectedIndex, this.searchBoxQueryParameters.Query, null, null);
  }
  getQueryResult(event: boolean) {

  }
  getArticleSelected(article: Article) {
    this.article = article;
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiConnectionService } from '../../shared/services/apiconnection.service';
import { Article } from '../../shared/modals/article';
import { TopHeadlines } from '../../shared/modals/top-headlines';
import { Source, SourceWrapper } from '../../shared/modals/source';
import { ModalDirective } from 'angular-bootstrap-md';

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
  ngOnInit() {
    this.getBreakingNewsData();
  }
  getBreakingNewsData() {
    this.apiConnectionService.getBreakingNewsfromAPI('us', null, null, null, 5).subscribe(
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
}

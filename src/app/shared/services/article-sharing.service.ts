import { Injectable } from '@angular/core';
import { Article } from '../modals/article';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ArticleSharingService {
private articleSubject = new Subject<Article[]>();
private totalArticlesSubject = new Subject<number>();
articleObserved = this.articleSubject.asObservable();
totalArticlesObserved = this.totalArticlesSubject.asObservable();
shareArticleByCategory(articles: Article[]) {
    this.articleSubject.next(articles);
}
shareTotalArticle(totalArticles: number) {
this.totalArticlesSubject.next(totalArticles);
}
}

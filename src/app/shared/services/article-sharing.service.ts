import { Injectable } from '@angular/core';
import { Article } from '../modals/article';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ArticleSharingService {
private articleObservable = new Subject<Article[]>();
articleObserved = this.articleObservable.asObservable();
shareArticleByCategory(articles: Article[]) {
    this.articleObservable.next(articles);
}
}

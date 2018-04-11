import { Component, OnInit, Output, Input } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {FormsModule, ReactiveFormsModule, FormControl, NgControl} from '@angular/forms';
import { ApiConnectionService } from '../services/apiconnection.service';
import { SourceWrapper } from '../modals/source';
import { SearchQueryModal } from '../modals/searchquerymodal';
import { Observable } from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { Article } from '../modals/article';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  maxDate = new Date();
  minDate = this.maxDate;
  @Output() articleSelected = new EventEmitter<Article>();
  @Output() articlesSelected = new EventEmitter<SearchQueryModal>();
  @Output() displayQueryResult = new EventEmitter<boolean>();
  @Input() category: string  = null;
  events: string[] = [];
  private searchUpdated: Subject<string> = new Subject<string>();
  private articlesFetched: Subject<Article[]> = new Subject<Article[]>();
  sortBy = [
    {value: 'relevancy', name: 'Relevancy'},
    {value: 'popularity', name: 'Popularity'},
    {value: 'publishedAt', name: 'Published At'}
    ];
  searchBox = new FormControl();
  sourceWrapper: SourceWrapper;
  constructor(private apiConnectionService: ApiConnectionService) { }
  publishers = new FormControl();
  flag = false;
  searchQueryModel: SearchQueryModal;
  filteredOptions: Observable<Article[]>;
  queriedArticles: Observable<string>;
  selectedSortByValue = new FormControl();
  sources = null; from = null; to = null; language = null; sortby = null; domain = null;
  ngOnInit() {
    if (this.category) {
      this.getResultsByCategory(this.category);
    } else {
      this.getResultsbyFilter();
    }
  }
  getResultsByCategory(category: string) {
    this.apiConnectionService.getSourcesfromAPI().subscribe(
      response => {this.sourceWrapper = response.body;
      }
    );
    this.queriedArticles = this.searchUpdated.asObservable().debounceTime(2000).distinctUntilChanged();
    this.queriedArticles.subscribe(
      input => {if (input.trim().length) {
        this.apiConnectionService.getQueryResultfromAPI(input,
          this.publishers.value ? this.publishers.value.toString() : null,
           this.domain, this.from, this.to, 'en', this.selectedSortByValue.value)
          .subscribe(
          response => {this.searchQueryModel = response.body;
            this.articlesFetched.next(this.searchQueryModel.articles);
            this.articlesSelected.emit(this.searchQueryModel);
            this.filteredOptions = this.searchBox.valueChanges
            .pipe(
              startWith<string | Article>(''),
              map(value => typeof value === 'string' ? value : value.title),
              map(name => name ? this.filter(name) : this.searchQueryModel.articles.slice())
            );
          }
        );
      }}
    );
  }
  getResultsbyFilter() {
    this.apiConnectionService.getSourcesfromAPI().subscribe(
      response => {this.sourceWrapper = response.body;
      }
    );
    this.queriedArticles = this.searchUpdated.asObservable().debounceTime(2000).distinctUntilChanged();
    this.queriedArticles.subscribe(
      input => {if (input.trim().length) {
        this.apiConnectionService.getQueryResultfromAPI(input,
          this.publishers.value ? this.publishers.value.toString() : null,
           this.domain, this.from, this.to, 'en', this.selectedSortByValue.value)
          .subscribe(
          response => {this.searchQueryModel = response.body;
            this.articlesFetched.next(this.searchQueryModel.articles);
            this.articlesSelected.emit(this.searchQueryModel);
            this.filteredOptions = this.searchBox.valueChanges
            .pipe(
              startWith<string | Article>(''),
              map(value => typeof value === 'string' ? value : value.title),
              map(name => name ? this.filter(name) : this.searchQueryModel.articles.slice())
            );
          }
        );
      }}
    );
  }
  onKeyPressed(value: string) {
    this.searchUpdated.next(value.trim());
  }
  onEnterPressed(input: string) {
    this.displayQueryResult.emit(true);
    if (input.trim().length === 0) {
      this.displayQueryResult.emit(false);
    }
  }
  displayFn(article?: Article): string | undefined {
    return article ? article.title : undefined;
  }
  filter(name: string): Article[] {
    return this.searchQueryModel.articles.filter(option =>
      option.title.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
  toggleAdvancedSearch() {
    this.flag = !this.flag;
  }

  onSelectArticle(article: Article) {
    this.articleSelected.emit(article);
  }
  fromdateChanged(type: string, event: MatDatepickerInputEvent<Date>) {
  this.minDate = event.value;
this.from = this.minDate.toISOString();
  }
  todateChanged(type: string, event: MatDatepickerInputEvent<Date>) {
  this.minDate = event.value;
  this.to = this.minDate.toISOString();
  }
}

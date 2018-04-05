import { Component, OnInit } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {FormsModule, ReactiveFormsModule, FormControl, NgControl} from '@angular/forms';
import { ApiConnectionService } from '../services/apiconnection.service';
import { SourceWrapper } from '../modals/source';
import { SearchQueryModal } from '../modals/searchquerymodal';
import { Observable } from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { Article } from '../modals/article';
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  events: string[] = [];
  sortBy: string[] = ['Relevancy', 'Popularity', 'Published At'];
  searchBox = new FormControl();
  sourceWrapper: SourceWrapper;
  constructor(private apiConnectionService: ApiConnectionService) { }
  publishers = new FormControl();
  flag = false;
  searchQueryModel: SearchQueryModal;
  filteredOptions: Observable<Article[]>;
  ngOnInit() {
    this.apiConnectionService.getSourcesfromAPI().subscribe(
      response => {this.sourceWrapper = response.body;
      }
    );
  }
  onKeyPressed(value: string) {
  }
  onEnterPressed(input: string) {
    console.log(input);
    this.apiConnectionService.getQueryResultfromAPI(input, null, null, null, null, 'en').subscribe(
      response => {this.searchQueryModel = response.body;
        this.filteredOptions = this.searchBox.valueChanges
        .pipe(
          startWith<string | Article>(''),
          map(value => typeof value === 'string' ? value : value.title),
          map(name => name ? this.filter(name) : this.searchQueryModel.articles.slice())
        );
      }
    );
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
}

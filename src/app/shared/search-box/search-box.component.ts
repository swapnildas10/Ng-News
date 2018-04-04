import { Component, OnInit } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {FormsModule, ReactiveFormsModule, FormControl, NgControl} from '@angular/forms';
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  events: string[] = [];
  constructor() { }
  toppings = new FormControl();
  flag = false;
  ngOnInit() {
  }
  onKeyPressed(value: any) {
    console.log(value);
  }
  onEnterPressed(value: any) {
    console.log(value);
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
  toggleAdvancedSearch() {
    this.flag = !this.flag;
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onKeyPressed(value: any) {
    console.log(value);
  }
  onEnterPressed(value: any) {
    console.log(value);
  }
}

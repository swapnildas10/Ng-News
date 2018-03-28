import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  element: HTMLElement;
  num;
  @Input() pageSize: number;
  @Input() pageCount: number;
  @Output() pageClicked = new EventEmitter<number>();
  @ViewChild('index') pageLink: ElementRef;
  constructor() { }

  ngOnInit() {
  }
  onpageClick(event: number) {
    this.pageClicked.emit(event);
  }
  onIndex(event: number) {
    console.log(event);
this.num = event;
  }
}
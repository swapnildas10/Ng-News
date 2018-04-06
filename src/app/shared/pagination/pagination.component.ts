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
  @ViewChild('pagination') pagination: ElementRef;
  @ViewChild('first') first: ElementRef;
  @ViewChild('firstlogo') firstLogo: ElementRef;
  @ViewChild('last') last: ElementRef;
  @ViewChild('lastlogo') lastLogo: ElementRef;
  constructor() {
  }

  ngOnInit() {
  }
  onpageClick(event: number) {
    if (event === 0) {
      (<DOMTokenList>this.first.nativeElement.classList).add('disabled');
      (<DOMTokenList>this.firstLogo.nativeElement.classList).add('disabled');
    } else {
      (<DOMTokenList>this.first.nativeElement.classList).remove('disabled');
      (<DOMTokenList>this.firstLogo.nativeElement.classList).remove('disabled');
    }

      for (let index = 0; index < (<HTMLCollection>this.pagination.nativeElement.children).length; index++) {
        const element = (<HTMLCollection>this.pagination.nativeElement.children).item(index).children[0];
        if ((<DOMTokenList>element.classList).contains('active') && index !== event ) {
          (<DOMTokenList>element.classList).remove('active');
      }
      if (index === event) {
        if (!(<DOMTokenList>element.classList).contains('active')) {
          (<DOMTokenList>element.classList).add('active');
      }
      }

      if (event + 2 > index) {
        (<HTMLAnchorElement>element.children[0]).innerText = (+(<HTMLAnchorElement>element.children[0]).innerText + 1).toString();
        console.log((<HTMLAnchorElement>element.children[0]).innerText);
      }

      if (event - 2 < index) {
        (<HTMLAnchorElement>element.children[0]).innerText = (+(<HTMLAnchorElement>element.children[0]).innerText - 1).toString();
        console.log((<HTMLAnchorElement>element.children[0]).innerText);
      }
      if (event === (<HTMLCollection>this.pagination.nativeElement.children).length - 1) {
        if (!(<DOMTokenList>this.last.nativeElement.classList).contains('disabled')) {
          (<DOMTokenList>this.last.nativeElement.classList).add('disabled');
        }
        if (!(<DOMTokenList>this.lastLogo.nativeElement.classList).contains('disabled')) {
          (<DOMTokenList>this.lastLogo.nativeElement.classList).add('disabled');
        }
      } else {
        if ((<DOMTokenList>this.last.nativeElement.classList).contains('disabled')) {
          (<DOMTokenList>this.last.nativeElement.classList).remove('disabled');
        }
        if ((<DOMTokenList>this.lastLogo.nativeElement.classList).contains('disabled')) {
          (<DOMTokenList>this.lastLogo.nativeElement.classList).remove('disabled');
        }
      }
  }
    this.pageClicked.emit(event + 1);
  }
  onIndex(event: number) {
this.num = event;
  }
}

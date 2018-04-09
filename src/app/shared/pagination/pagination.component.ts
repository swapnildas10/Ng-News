import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  element: HTMLElement;
  num;
  currentPage: number;
  @Input() pageSize: number;
  @Input() pageCount: number;
  pagestart = 0;
  pageNumberIndex = 0;
  @Output() pageClicked = new EventEmitter<number>();
  @ViewChild('pagination') pagination: ElementRef;
  @ViewChild('first') first: ElementRef;
  @ViewChild('firstlogo') firstLogo: ElementRef;
  @ViewChild('last') last: ElementRef;
  @ViewChild('lastlogo') lastLogo: ElementRef;
  constructor() {
  }

  ngOnInit() {
    this.currentPage = 0;
  }
  onpageClick(event: number) {
    console.log('current page: ' +
    this.currentPage + 'page start: ' + this.pagestart + 'event: ' + event + 'page number index:' + this.pageNumberIndex);
    if (this.pageNumberIndex === 0) {

    }
    if (event % 4 === 0) {
      this.pageNumberIndex = 0;
      if (this.currentPage < event) {
        this.pagestart += 4;
      } else if (this.currentPage > event && event !== 0) {
        this.pagestart -= 4;
        this.pageNumberIndex = 4;
      } else if (this.currentPage === 1 && event === 0) {
        this.pagestart = 0;
      }

    } else {
      if (this.currentPage < event) {
        this.pageNumberIndex +=   (event - this.currentPage) ;
      } else if (this.currentPage > event) {
        this.pageNumberIndex -= this.currentPage - event;
      }
    }
    this.currentPage =  event;
    console.log('current page: ' +
     this.currentPage + 'page start: ' + this.pagestart + 'event: ' + event + 'page number index:' + this.pageNumberIndex);
    if ( this.currentPage === 0) {
      (<DOMTokenList>this.first.nativeElement.classList).add('disabled');
      (<DOMTokenList>this.firstLogo.nativeElement.classList).add('disabled');
    } else {
      (<DOMTokenList>this.first.nativeElement.classList).remove('disabled');
      (<DOMTokenList>this.firstLogo.nativeElement.classList).remove('disabled');
    }

      for (let index = 0; index < (<HTMLCollection>this.pagination.nativeElement.children).length; index++) {
        const element = (<HTMLCollection>this.pagination.nativeElement.children).item(index).children[0];
        if ((<DOMTokenList>element.classList).contains('active') && index !== this.pageNumberIndex ) {
          (<DOMTokenList>element.classList).remove('active');
      }
      if (index ===  this.pageNumberIndex) {
        if (!(<DOMTokenList>element.classList).contains('active')) {
          (<DOMTokenList>element.classList).add('active');
      }
      }

      if ( this.currentPage === (<HTMLCollection>this.pagination.nativeElement.children).length - 1) {
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
    this.pageClicked.emit( this.currentPage + 1);
  }
  onIndex(event: number) {
this.num = event;
  }
  goToNextPage() {
    if (this.pageNumberIndex === 4) {
      this.pageNumberIndex = 0;
      this.pagestart += 4;
      this.onpageClick(this.currentPage + 1 );
    } else if (this.pageNumberIndex < 3) {
    this.onpageClick(this.currentPage + 1);
    } else if (this.pageNumberIndex === 3) {
      this.pageNumberIndex = 4;
      this.onpageClick(this.currentPage + 1);
    }
  }
  goToLastPage() {
    this.onpageClick(this.pageCount - 1);
  }
  goToPreviousPage() {
    if (this.pageNumberIndex === 1) {
      this.pageNumberIndex--;
      this.onpageClick(this.currentPage - 1 );
    } else if (this.pageNumberIndex > 1) {
    this.onpageClick(this.currentPage - 1);
    } else if (this.pageNumberIndex === 0) {
      this.pageNumberIndex = 4;
      this.pagestart -= 4;
      this.onpageClick(this.currentPage - 1);
    }
  }
  goToFirstPage() {
    this.onpageClick(0);
  }
}

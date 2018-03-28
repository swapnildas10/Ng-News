import { Directive, Input, TemplateRef, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import {  } from 'selenium-webdriver';

@Directive({ selector: '[appLoop]', exportAs: 'appLoop'})
export class LoopDirective {
    @Output() index = new EventEmitter<number>();
    @Input() set appLoop(count: number) {
        for ( let i = 0; i < count; i++) {
           this.viewContainer.createEmbeddedView(this.templateRef);
          this.index.emit(i);
        }
    }
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) { }
}

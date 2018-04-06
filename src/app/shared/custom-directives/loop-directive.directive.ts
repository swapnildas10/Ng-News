import { Directive, Input, TemplateRef, ViewContainerRef, Output, EventEmitter } from '@angular/core';



@Directive({
    selector: '[appLoop]'
})
export class LoopDirective {
    index: number;
     @Input() set appLoop(count: number) {
         this.viewContainer.clear();
        for ( let i = 0; i < count; i++) {
            this.index = i;
           this.viewContainer.createEmbeddedView(this.templateRef, {
               $implicit: i,
               index: this.index
            });
        }
    }
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) { }
}

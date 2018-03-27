import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[appLoop]'})
export class LoopDirective {
    @Input() set appLoop(count: number) {
        for ( let i = 0; i < count; i++) {
           this.viewContainer.createEmbeddedView(this.templateRef);
           console.log(count);
        }
    }
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) { }
}

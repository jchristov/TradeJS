import {Directive, ElementRef, OnInit, Output, EventEmitter, Input} from '@angular/core';

const interact = require('interactjs');

@Directive({
    selector: '[resizable]',
    exportAs: 'resizable',
    outputs: ['resized']
})
export class ResizableDirective implements OnInit {

    @Output() public resized:EventEmitter<string> = new EventEmitter();

    @Input()
    private _resizeHandle: HTMLElement;

    constructor(private _elementRef: ElementRef) {}

    ngOnInit() {
        this._setUIHandles();
    }

    private _setUIHandles() {

        interact(this._elementRef.nativeElement)
            .resizable({
                preserveAspectRatio: false,
                edges: { left: true, right: true, bottom: true, top: true },
                min: 100,
                onend: () => {
                    this.resized.next();
                },
                restrict: {
                    restriction: "parent"
                },
                onmove: (event) => {
                    event.preventDefault();

                    if (event.currentTarget !== this._resizeHandle)
                        return;

                    if (event.rect.height < 100 || event.rect.width < 300)
                        return;

                    var target = event.target,
                        x = (parseFloat(target.getAttribute('data-x')) || 0),
                        y = (parseFloat(target.getAttribute('data-y')) || 0);

                    if (event.rect.height < 100 || event.rect.width < 300)
                        return;

                    // update the element's style
                    target.style.width  = event.rect.width + 'px';
                    target.style.height = event.rect.height + 'px';

                    // translate when resizing from top or left edges
                    x += event.deltaRect.left;
                    y += event.deltaRect.top;

                    target.style.webkitTransform = target.style.transform =
                        'translate(' + x + 'px,' + y + 'px)';

                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                }
            })
            //.allowFrom(this._elementRef.nativeElement);
            // .actionChecker((pointer, event, action, interactable, element) => {
            //     // Only listen to left mouse button
            //     if (action.name === 'resize' && event.button === 0)
            //         return action;
            //
            //     console.log(action.name);
            // });
    }
}
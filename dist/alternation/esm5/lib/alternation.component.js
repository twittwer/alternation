/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Alternation } from './alternation.service';
import { alternationTrigger } from './alternation.trigger';
var AlternationComponent = /** @class */ (function () {
    function AlternationComponent(alter, renderer, dom, el) {
        this.alter = alter;
        this.renderer = renderer;
        this.dom = dom;
        this.el = el;
        this.disabled = false;
    }
    Object.defineProperty(AlternationComponent.prototype, "safeSrc", {
        get: /**
         * @return {?}
         */
        function () {
            return this.src
                ? this.dom.bypassSecurityTrustStyle("url(" + this.src + ")")
                : '';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} ev
     * @return {?}
     */
    AlternationComponent.prototype.start = /**
     * @param {?} ev
     * @return {?}
     */
    function (ev) {
        this.alter.start();
    };
    /**
     * @param {?} ev
     * @return {?}
     */
    AlternationComponent.prototype.done = /**
     * @param {?} ev
     * @return {?}
     */
    function (ev) {
        this.renderer.setStyle(ev.element, 'transform', "translateY(" + ev.toState + "px)");
        this.alter.done();
    };
    /**
     * @return {?}
     */
    AlternationComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.alternation = this.alter.init(this.el, { delay: this.delay });
    };
    AlternationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'alternation',
                    animations: [alternationTrigger],
                    styles: [":host{position:relative;overflow:hidden;display:block;height:100%;width:100%}div.image{background-repeat:no-repeat;background-position:center;background-size:cover;will-change:transform;display:block;height:200%;width:100%}div.content{position:absolute;top:0;width:100%;height:100%}"],
                    template: "\n    <div\n      class=\"image\"\n      [style.backgroundImage]=\"safeSrc\"\n      [@.disabled]=\"disabled\"\n      (@alternation.done)=\"done($event)\"\n      (@alternation.start)=\"start($event)\"\n      [@alternation]=\"alternation | async\"\n    ></div>\n    <div class=\"content\">\n      <ng-content></ng-content>\n    </div>\n  ",
                },] },
    ];
    /** @nocollapse */
    AlternationComponent.ctorParameters = function () { return [
        { type: Alternation },
        { type: Renderer2 },
        { type: DomSanitizer },
        { type: ElementRef }
    ]; };
    AlternationComponent.propDecorators = {
        disabled: [{ type: Input }],
        delay: [{ type: Input }],
        src: [{ type: Input }]
    };
    return AlternationComponent;
}());
export { AlternationComponent };
function AlternationComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AlternationComponent.prototype.disabled;
    /** @type {?} */
    AlternationComponent.prototype.delay;
    /** @type {?} */
    AlternationComponent.prototype.src;
    /** @type {?} */
    AlternationComponent.prototype.alternation;
    /** @type {?} */
    AlternationComponent.prototype.alter;
    /** @type {?} */
    AlternationComponent.prototype.renderer;
    /** @type {?} */
    AlternationComponent.prototype.dom;
    /** @type {?} */
    AlternationComponent.prototype.el;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWx0ZXJuYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYWx0ZXJuYXRpb24vIiwic291cmNlcyI6WyJsaWIvYWx0ZXJuYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQVUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxZQUFZLEVBQWEsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0lBcUJ6RCw4QkFDUyxPQUNDLFVBQ0EsS0FDQTtRQUhELFVBQUssR0FBTCxLQUFLO1FBQ0osYUFBUSxHQUFSLFFBQVE7UUFDUixRQUFHLEdBQUgsR0FBRztRQUNILE9BQUUsR0FBRixFQUFFO3dCQUVpQixLQUFLO0tBRDlCO0lBTUosc0JBQUkseUNBQU87Ozs7UUFBWDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRztnQkFDYixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxTQUFPLElBQUksQ0FBQyxHQUFHLE1BQUcsQ0FBQztnQkFDdkQsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUNSOzs7T0FBQTs7Ozs7SUFFRCxvQ0FBSzs7OztJQUFMLFVBQU0sRUFBRTtRQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDcEI7Ozs7O0lBRUQsbUNBQUk7Ozs7SUFBSixVQUFLLEVBQUU7UUFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FDcEIsRUFBRSxDQUFDLE9BQU8sRUFDVixXQUFXLEVBQ1gsZ0JBQWMsRUFBRSxDQUFDLE9BQU8sUUFBSyxDQUM5QixDQUFDO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNuQjs7OztJQUVELHVDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztLQUNwRTs7Z0JBbkRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsVUFBVSxFQUFFLENBQUMsa0JBQWtCLENBQUM7b0JBQ2hDLE1BQU0sRUFBRSxDQUFDLDRSQUE0UixDQUFDO29CQUN0UyxRQUFRLEVBQUUsa1ZBWVQ7aUJBQ0Y7Ozs7Z0JBcEJRLFdBQVc7Z0JBRjJCLFNBQVM7Z0JBQy9DLFlBQVk7Z0JBREQsVUFBVTs7OzJCQThCM0IsS0FBSzt3QkFDTCxLQUFLO3NCQUNMLEtBQUs7OytCQWhDUjs7U0F1QmEsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25Jbml0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZVN0eWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBBbHRlcm5hdGlvbiB9IGZyb20gJy4vYWx0ZXJuYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBhbHRlcm5hdGlvblRyaWdnZXIgfSBmcm9tICcuL2FsdGVybmF0aW9uLnRyaWdnZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhbHRlcm5hdGlvbicsXG4gIGFuaW1hdGlvbnM6IFthbHRlcm5hdGlvblRyaWdnZXJdLFxuICBzdHlsZXM6IFtgOmhvc3R7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVuO2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX1kaXYuaW1hZ2V7YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O2JhY2tncm91bmQtcG9zaXRpb246Y2VudGVyO2JhY2tncm91bmQtc2l6ZTpjb3Zlcjt3aWxsLWNoYW5nZTp0cmFuc2Zvcm07ZGlzcGxheTpibG9jaztoZWlnaHQ6MjAwJTt3aWR0aDoxMDAlfWRpdi5jb250ZW50e3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9YF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJpbWFnZVwiXG4gICAgICBbc3R5bGUuYmFja2dyb3VuZEltYWdlXT1cInNhZmVTcmNcIlxuICAgICAgW0AuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgKEBhbHRlcm5hdGlvbi5kb25lKT1cImRvbmUoJGV2ZW50KVwiXG4gICAgICAoQGFsdGVybmF0aW9uLnN0YXJ0KT1cInN0YXJ0KCRldmVudClcIlxuICAgICAgW0BhbHRlcm5hdGlvbl09XCJhbHRlcm5hdGlvbiB8IGFzeW5jXCJcbiAgICA+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQWx0ZXJuYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgYWx0ZXI6IEFsdGVybmF0aW9uLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGRvbTogRG9tU2FuaXRpemVyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWZcbiAgKSB7fVxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBkZWxheTogbnVtYmVyO1xuICBASW5wdXQoKSBzcmM6IHN0cmluZztcbiAgYWx0ZXJuYXRpb247XG5cbiAgZ2V0IHNhZmVTcmMoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zcmNcbiAgICAgID8gdGhpcy5kb20uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKGB1cmwoJHt0aGlzLnNyY30pYClcbiAgICAgIDogJyc7XG4gIH1cblxuICBzdGFydChldik6IHZvaWQge1xuICAgIHRoaXMuYWx0ZXIuc3RhcnQoKTtcbiAgfVxuXG4gIGRvbmUoZXYpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgZXYuZWxlbWVudCxcbiAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgYHRyYW5zbGF0ZVkoJHtldi50b1N0YXRlfXB4KWBcbiAgICApO1xuICAgIHRoaXMuYWx0ZXIuZG9uZSgpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hbHRlcm5hdGlvbiA9IHRoaXMuYWx0ZXIuaW5pdCh0aGlzLmVsLCB7IGRlbGF5OiB0aGlzLmRlbGF5IH0pO1xuICB9XG59XG4iXX0=
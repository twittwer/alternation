import { Injectable, NgZone, Component, ElementRef, Input, Renderer2, NgModule, defineInjectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { trigger, style, transition, animate } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Alternation = /** @class */ (function () {
    function Alternation(dispatcher, zone) {
        this.dispatcher = dispatcher;
        this.zone = zone;
        this.alternation = new BehaviorSubject({ value: 0, params: { next: 0, time: 0 } });
        this.running = new BehaviorSubject(false);
        this.speed = new BehaviorSubject(3);
        this._next = null;
    }
    /**
     * @param {?} value
     * @param {?} time
     * @return {?}
     */
    Alternation.prototype.position = /**
     * @param {?} value
     * @param {?} time
     * @return {?}
     */
    function (value, time) {
        return { value: value, params: { next: value || 0, time: time } };
    };
    /**
     * @return {?}
     */
    Alternation.prototype.done = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.running.next(false);
        if (this._next) {
            this.zone.run(function () {
                _this.alternation.next(_this._next);
                _this._next = null;
            });
        }
    };
    /**
     * @return {?}
     */
    Alternation.prototype.start = /**
     * @return {?}
     */
    function () {
        this.running.next(true);
    };
    /**
     * @param {?} el
     * @param {?=} options
     * @return {?}
     */
    Alternation.prototype.init = /**
     * @param {?} el
     * @param {?=} options
     * @return {?}
     */
    function (el, options) {
        var _this = this;
        if (options === void 0) { options = { delay: null }; }
        this.dispatcher.scrolled(options.delay).subscribe(function (scrollable) {
            if (scrollable) {
                var /** @type {?} */ $scrollable = scrollable.getElementRef().nativeElement;
                var /** @type {?} */ componentRect = el.nativeElement.getBoundingClientRect();
                var /** @type {?} */ difference = Math.round(componentRect.height - componentRect.height * 2);
                var /** @type {?} */ next = -Math.round($scrollable.scrollTop / 3);
                var /** @type {?} */ time = Math.abs(_this.alternation.value.value - next) * 5;
                if (next < difference) {
                    next = difference;
                }
                var /** @type {?} */ position_1 = _this.position(next, time);
                if (_this.running.value) {
                    _this._next = position_1;
                    return;
                }
                if (next) {
                    _this.zone.run(function () {
                        _this.alternation.next(position_1);
                    });
                }
            }
        });
        return this.alternation;
    };
    Alternation.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    Alternation.ctorParameters = function () { return [
        { type: ScrollDispatcher },
        { type: NgZone }
    ]; };
    /** @nocollapse */ Alternation.ngInjectableDef = defineInjectable({ factory: function Alternation_Factory() { return new Alternation(inject(ScrollDispatcher), inject(NgZone)); }, token: Alternation, providedIn: "root" });
    return Alternation;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ alternationTrigger = trigger('alternation', [
    transition('* => *', [
        animate('{{ time }}ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({ transform: 'translateY({{ next }}px)' })),
    ]),
]);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AlternationModule = /** @class */ (function () {
    function AlternationModule() {
    }
    AlternationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [AlternationComponent],
                    exports: [AlternationComponent]
                },] },
    ];
    return AlternationModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { Alternation, AlternationComponent, AlternationModule, alternationTrigger as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWx0ZXJuYXRpb24uanMubWFwIiwic291cmNlcyI6WyJuZzovL2FsdGVybmF0aW9uL2xpYi9hbHRlcm5hdGlvbi5zZXJ2aWNlLnRzIiwibmc6Ly9hbHRlcm5hdGlvbi9saWIvYWx0ZXJuYXRpb24udHJpZ2dlci50cyIsIm5nOi8vYWx0ZXJuYXRpb24vbGliL2FsdGVybmF0aW9uLmNvbXBvbmVudC50cyIsIm5nOi8vYWx0ZXJuYXRpb24vbGliL2FsdGVybmF0aW9uLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2Nyb2xsRGlzcGF0Y2hlciwgQ2RrU2Nyb2xsYWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBbHRlcm5hdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlciwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHsgfVxuICBhbHRlcm5hdGlvbjogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHsgdmFsdWU6IDAsIHBhcmFtczogeyBuZXh0OiAwLCB0aW1lOiAwIH0gfSk7XG4gIHJ1bm5pbmc6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuICBzcGVlZDogQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KDMpO1xuICBwcml2YXRlIF9uZXh0ID0gbnVsbDtcblxuICBwb3NpdGlvbih2YWx1ZSwgdGltZSkge1xuICAgIHJldHVybiB7IHZhbHVlLCBwYXJhbXM6IHsgbmV4dDogdmFsdWUgfHwgMCwgdGltZSB9IH07XG4gIH1cblxuICBkb25lKCkge1xuICAgIHRoaXMucnVubmluZy5uZXh0KGZhbHNlKTtcblxuICAgIGlmICh0aGlzLl9uZXh0KSB7XG4gICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5hbHRlcm5hdGlvbi5uZXh0KHRoaXMuX25leHQpO1xuICAgICAgICB0aGlzLl9uZXh0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMucnVubmluZy5uZXh0KHRydWUpO1xuICB9XG5cbiAgaW5pdChlbCwgb3B0aW9uczogeyBkZWxheT86IG51bWJlciB9ID0geyBkZWxheTogbnVsbCB9KSB7XG4gICAgdGhpcy5kaXNwYXRjaGVyLnNjcm9sbGVkKG9wdGlvbnMuZGVsYXkpLnN1YnNjcmliZSgoc2Nyb2xsYWJsZTogQ2RrU2Nyb2xsYWJsZSkgPT4ge1xuICAgICAgaWYgKHNjcm9sbGFibGUpIHtcbiAgICAgICAgY29uc3QgJHNjcm9sbGFibGU6IEhUTUxFbGVtZW50ID0gc2Nyb2xsYWJsZS5nZXRFbGVtZW50UmVmKCkubmF0aXZlRWxlbWVudDtcbiAgICAgICAgY29uc3QgY29tcG9uZW50UmVjdCA9IGVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IGRpZmZlcmVuY2UgPSBNYXRoLnJvdW5kKGNvbXBvbmVudFJlY3QuaGVpZ2h0IC0gY29tcG9uZW50UmVjdC5oZWlnaHQgKiAyKTtcbiAgICAgICAgbGV0IG5leHQgPSAtTWF0aC5yb3VuZCgkc2Nyb2xsYWJsZS5zY3JvbGxUb3AgLyAzKTtcbiAgICAgICAgY29uc3QgdGltZSA9IE1hdGguYWJzKHRoaXMuYWx0ZXJuYXRpb24udmFsdWUudmFsdWUgLSBuZXh0KSAqIDU7XG5cbiAgICAgICAgaWYgKG5leHQgPCBkaWZmZXJlbmNlKSB7XG4gICAgICAgICAgbmV4dCA9IGRpZmZlcmVuY2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb24obmV4dCwgdGltZSk7XG5cbiAgICAgICAgaWYgKHRoaXMucnVubmluZy52YWx1ZSkge1xuICAgICAgICAgIHRoaXMuX25leHQgPSBwb3NpdGlvbjtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV4dCkge1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hbHRlcm5hdGlvbi5uZXh0KHBvc2l0aW9uKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYWx0ZXJuYXRpb247XG4gIH1cbn1cbiIsImltcG9ydCB7IHRyaWdnZXIsIHN0eWxlLCB0cmFuc2l0aW9uLCBhbmltYXRlLCBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuZXhwb3J0IGNvbnN0IGFsdGVybmF0aW9uVHJpZ2dlcjogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhID0gdHJpZ2dlcignYWx0ZXJuYXRpb24nLCBbXG4gIHRyYW5zaXRpb24oJyogPT4gKicsIFtcbiAgICBhbmltYXRlKFxuICAgICAgJ3t7IHRpbWUgfX1tcyBjdWJpYy1iZXppZXIoMC4wLCAwLjAsIDAuMiwgMSknLFxuICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKHt7IG5leHQgfX1weCknIH0pXG4gICAgKSxcbiAgXSksXG5dKTtcbiIsImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE9uSW5pdCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVTdHlsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgQWx0ZXJuYXRpb24gfSBmcm9tICcuL2FsdGVybmF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgYWx0ZXJuYXRpb25UcmlnZ2VyIH0gZnJvbSAnLi9hbHRlcm5hdGlvbi50cmlnZ2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWx0ZXJuYXRpb24nLFxuICBhbmltYXRpb25zOiBbYWx0ZXJuYXRpb25UcmlnZ2VyXSxcbiAgc3R5bGVzOiBbYDpob3N0e3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbjtkaXNwbGF5OmJsb2NrO2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9ZGl2LmltYWdle2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlcjtiYWNrZ3JvdW5kLXNpemU6Y292ZXI7d2lsbC1jaGFuZ2U6dHJhbnNmb3JtO2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjIwMCU7d2lkdGg6MTAwJX1kaXYuY29udGVudHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfWBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwiaW1hZ2VcIlxuICAgICAgW3N0eWxlLmJhY2tncm91bmRJbWFnZV09XCJzYWZlU3JjXCJcbiAgICAgIFtALmRpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgIChAYWx0ZXJuYXRpb24uZG9uZSk9XCJkb25lKCRldmVudClcIlxuICAgICAgKEBhbHRlcm5hdGlvbi5zdGFydCk9XCJzdGFydCgkZXZlbnQpXCJcbiAgICAgIFtAYWx0ZXJuYXRpb25dPVwiYWx0ZXJuYXRpb24gfCBhc3luY1wiXG4gICAgPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIEFsdGVybmF0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGFsdGVyOiBBbHRlcm5hdGlvbixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBkb206IERvbVNhbml0aXplcixcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmXG4gICkge31cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgZGVsYXk6IG51bWJlcjtcbiAgQElucHV0KCkgc3JjOiBzdHJpbmc7XG4gIGFsdGVybmF0aW9uO1xuXG4gIGdldCBzYWZlU3JjKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc3JjXG4gICAgICA/IHRoaXMuZG9tLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShgdXJsKCR7dGhpcy5zcmN9KWApXG4gICAgICA6ICcnO1xuICB9XG5cbiAgc3RhcnQoZXYpOiB2b2lkIHtcbiAgICB0aGlzLmFsdGVyLnN0YXJ0KCk7XG4gIH1cblxuICBkb25lKGV2KTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgIGV2LmVsZW1lbnQsXG4gICAgICAndHJhbnNmb3JtJyxcbiAgICAgIGB0cmFuc2xhdGVZKCR7ZXYudG9TdGF0ZX1weClgXG4gICAgKTtcbiAgICB0aGlzLmFsdGVyLmRvbmUoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYWx0ZXJuYXRpb24gPSB0aGlzLmFsdGVyLmluaXQodGhpcy5lbCwgeyBkZWxheTogdGhpcy5kZWxheSB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IEFsdGVybmF0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9hbHRlcm5hdGlvbi5jb21wb25lbnQnXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtBbHRlcm5hdGlvbkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtBbHRlcm5hdGlvbkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQWx0ZXJuYXRpb25Nb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtJQVFFLHFCQUFvQixVQUE0QixFQUFVLElBQVk7UUFBbEQsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFROzJCQUNsQyxJQUFJLGVBQWUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt1QkFDL0QsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDO3FCQUM3QixJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUM7cUJBQ3ZDLElBQUk7S0FKdUQ7Ozs7OztJQU0zRSw4QkFBUTs7Ozs7SUFBUixVQUFTLEtBQUssRUFBRSxJQUFJO1FBQ2xCLE9BQU8sRUFBRSxLQUFLLE9BQUEsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQUEsRUFBRSxFQUFFLENBQUM7S0FDdEQ7Ozs7SUFFRCwwQkFBSTs7O0lBQUo7UUFBQSxpQkFTQztRQVJDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXpCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUNaLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEMsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7YUFDbkIsQ0FBQyxDQUFDO1NBQ0o7S0FDRjs7OztJQUVELDJCQUFLOzs7SUFBTDtRQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFD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
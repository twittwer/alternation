(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/cdk/scrolling'), require('@angular/animations'), require('@angular/platform-browser'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('alternation', ['exports', '@angular/core', 'rxjs', '@angular/cdk/scrolling', '@angular/animations', '@angular/platform-browser', '@angular/common'], factory) :
    (factory((global.alternation = {}),global.ng.core,global.rxjs,global.ng.cdk.scrolling,global.ng.animations,global.ng.platformBrowser,global.ng.common));
}(this, (function (exports,i0,rxjs,i1,animations,platformBrowser,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Alternation = (function () {
        function Alternation(dispatcher, zone) {
            this.dispatcher = dispatcher;
            this.zone = zone;
            this.alternation = new rxjs.BehaviorSubject({ value: 0, params: { next: 0, time: 0 } });
            this.running = new rxjs.BehaviorSubject(false);
            this.speed = new rxjs.BehaviorSubject(3);
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
                if (options === void 0) {
                    options = { delay: null };
                }
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        Alternation.ctorParameters = function () {
            return [
                { type: i1.ScrollDispatcher },
                { type: i0.NgZone }
            ];
        };
        /** @nocollapse */ Alternation.ngInjectableDef = i0.defineInjectable({ factory: function Alternation_Factory() { return new Alternation(i0.inject(i1.ScrollDispatcher), i0.inject(i0.NgZone)); }, token: Alternation, providedIn: "root" });
        return Alternation;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ alternationTrigger = animations.trigger('alternation', [
        animations.transition('* => *', [
            animations.animate('{{ time }}ms cubic-bezier(0.0, 0.0, 0.2, 1)', animations.style({ transform: 'translateY({{ next }}px)' })),
        ]),
    ]);

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AlternationComponent = (function () {
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
             */ function () {
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
            { type: i0.Component, args: [{
                        selector: 'alternation',
                        animations: [alternationTrigger],
                        styles: [":host{position:relative;overflow:hidden;display:block;height:100%;width:100%}div.image{background-repeat:no-repeat;background-position:center;background-size:cover;will-change:transform;display:block;height:200%;width:100%}div.content{position:absolute;top:0;width:100%;height:100%}"],
                        template: "\n    <div\n      class=\"image\"\n      [style.backgroundImage]=\"safeSrc\"\n      [@.disabled]=\"disabled\"\n      (@alternation.done)=\"done($event)\"\n      (@alternation.start)=\"start($event)\"\n      [@alternation]=\"alternation | async\"\n    ></div>\n    <div class=\"content\">\n      <ng-content></ng-content>\n    </div>\n  ",
                    },] },
        ];
        /** @nocollapse */
        AlternationComponent.ctorParameters = function () {
            return [
                { type: Alternation },
                { type: i0.Renderer2 },
                { type: platformBrowser.DomSanitizer },
                { type: i0.ElementRef }
            ];
        };
        AlternationComponent.propDecorators = {
            disabled: [{ type: i0.Input }],
            delay: [{ type: i0.Input }],
            src: [{ type: i0.Input }]
        };
        return AlternationComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AlternationModule = (function () {
        function AlternationModule() {
        }
        AlternationModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [common.CommonModule],
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

    exports.Alternation = Alternation;
    exports.AlternationComponent = AlternationComponent;
    exports.AlternationModule = AlternationModule;
    exports.ɵa = alternationTrigger;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWx0ZXJuYXRpb24udW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9hbHRlcm5hdGlvbi9saWIvYWx0ZXJuYXRpb24uc2VydmljZS50cyIsIm5nOi8vYWx0ZXJuYXRpb24vbGliL2FsdGVybmF0aW9uLnRyaWdnZXIudHMiLCJuZzovL2FsdGVybmF0aW9uL2xpYi9hbHRlcm5hdGlvbi5jb21wb25lbnQudHMiLCJuZzovL2FsdGVybmF0aW9uL2xpYi9hbHRlcm5hdGlvbi5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNjcm9sbERpc3BhdGNoZXIsIENka1Njcm9sbGFibGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQWx0ZXJuYXRpb24ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpc3BhdGNoZXI6IFNjcm9sbERpc3BhdGNoZXIsIHByaXZhdGUgem9uZTogTmdab25lKSB7IH1cbiAgYWx0ZXJuYXRpb246IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh7IHZhbHVlOiAwLCBwYXJhbXM6IHsgbmV4dDogMCwgdGltZTogMCB9IH0pO1xuICBydW5uaW5nOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcbiAgc3BlZWQ6IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCgzKTtcbiAgcHJpdmF0ZSBfbmV4dCA9IG51bGw7XG5cbiAgcG9zaXRpb24odmFsdWUsIHRpbWUpIHtcbiAgICByZXR1cm4geyB2YWx1ZSwgcGFyYW1zOiB7IG5leHQ6IHZhbHVlIHx8IDAsIHRpbWUgfSB9O1xuICB9XG5cbiAgZG9uZSgpIHtcbiAgICB0aGlzLnJ1bm5pbmcubmV4dChmYWxzZSk7XG5cbiAgICBpZiAodGhpcy5fbmV4dCkge1xuICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgIHRoaXMuYWx0ZXJuYXRpb24ubmV4dCh0aGlzLl9uZXh0KTtcbiAgICAgICAgdGhpcy5fbmV4dCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB0aGlzLnJ1bm5pbmcubmV4dCh0cnVlKTtcbiAgfVxuXG4gIGluaXQoZWwsIG9wdGlvbnM6IHsgZGVsYXk/OiBudW1iZXIgfSA9IHsgZGVsYXk6IG51bGwgfSkge1xuICAgIHRoaXMuZGlzcGF0Y2hlci5zY3JvbGxlZChvcHRpb25zLmRlbGF5KS5zdWJzY3JpYmUoKHNjcm9sbGFibGU6IENka1Njcm9sbGFibGUpID0+IHtcbiAgICAgIGlmIChzY3JvbGxhYmxlKSB7XG4gICAgICAgIGNvbnN0ICRzY3JvbGxhYmxlOiBIVE1MRWxlbWVudCA9IHNjcm9sbGFibGUuZ2V0RWxlbWVudFJlZigpLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFJlY3QgPSBlbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCBkaWZmZXJlbmNlID0gTWF0aC5yb3VuZChjb21wb25lbnRSZWN0LmhlaWdodCAtIGNvbXBvbmVudFJlY3QuaGVpZ2h0ICogMik7XG4gICAgICAgIGxldCBuZXh0ID0gLU1hdGgucm91bmQoJHNjcm9sbGFibGUuc2Nyb2xsVG9wIC8gMyk7XG4gICAgICAgIGNvbnN0IHRpbWUgPSBNYXRoLmFicyh0aGlzLmFsdGVybmF0aW9uLnZhbHVlLnZhbHVlIC0gbmV4dCkgKiA1O1xuXG4gICAgICAgIGlmIChuZXh0IDwgZGlmZmVyZW5jZSkge1xuICAgICAgICAgIG5leHQgPSBkaWZmZXJlbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uKG5leHQsIHRpbWUpO1xuXG4gICAgICAgIGlmICh0aGlzLnJ1bm5pbmcudmFsdWUpIHtcbiAgICAgICAgICB0aGlzLl9uZXh0ID0gcG9zaXRpb247XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWx0ZXJuYXRpb24ubmV4dChwb3NpdGlvbik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFsdGVybmF0aW9uO1xuICB9XG59XG4iLCJpbXBvcnQgeyB0cmlnZ2VyLCBzdHlsZSwgdHJhbnNpdGlvbiwgYW5pbWF0ZSwgQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbmV4cG9ydCBjb25zdCBhbHRlcm5hdGlvblRyaWdnZXI6IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSA9IHRyaWdnZXIoJ2FsdGVybmF0aW9uJywgW1xuICB0cmFuc2l0aW9uKCcqID0+IConLCBbXG4gICAgYW5pbWF0ZShcbiAgICAgICd7eyB0aW1lIH19bXMgY3ViaWMtYmV6aWVyKDAuMCwgMC4wLCAwLjIsIDEpJyxcbiAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSh7eyBuZXh0IH19cHgpJyB9KVxuICAgICksXG4gIF0pLFxuXSk7XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlU3R5bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEFsdGVybmF0aW9uIH0gZnJvbSAnLi9hbHRlcm5hdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IGFsdGVybmF0aW9uVHJpZ2dlciB9IGZyb20gJy4vYWx0ZXJuYXRpb24udHJpZ2dlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FsdGVybmF0aW9uJyxcbiAgYW5pbWF0aW9uczogW2FsdGVybmF0aW9uVHJpZ2dlcl0sXG4gIHN0eWxlczogW2A6aG9zdHtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW47ZGlzcGxheTpibG9jaztoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfWRpdi5pbWFnZXtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXI7YmFja2dyb3VuZC1zaXplOmNvdmVyO3dpbGwtY2hhbmdlOnRyYW5zZm9ybTtkaXNwbGF5OmJsb2NrO2hlaWdodDoyMDAlO3dpZHRoOjEwMCV9ZGl2LmNvbnRlbnR7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX1gXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cImltYWdlXCJcbiAgICAgIFtzdHlsZS5iYWNrZ3JvdW5kSW1hZ2VdPVwic2FmZVNyY1wiXG4gICAgICBbQC5kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAoQGFsdGVybmF0aW9uLmRvbmUpPVwiZG9uZSgkZXZlbnQpXCJcbiAgICAgIChAYWx0ZXJuYXRpb24uc3RhcnQpPVwic3RhcnQoJGV2ZW50KVwiXG4gICAgICBbQGFsdGVybmF0aW9uXT1cImFsdGVybmF0aW9uIHwgYXN5bmNcIlxuICAgID48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBBbHRlcm5hdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBhbHRlcjogQWx0ZXJuYXRpb24sXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZG9tOiBEb21TYW5pdGl6ZXIsXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZlxuICApIHt9XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRlbGF5OiBudW1iZXI7XG4gIEBJbnB1dCgpIHNyYzogc3RyaW5nO1xuICBhbHRlcm5hdGlvbjtcblxuICBnZXQgc2FmZVNyYygpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNyY1xuICAgICAgPyB0aGlzLmRvbS5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoYHVybCgke3RoaXMuc3JjfSlgKVxuICAgICAgOiAnJztcbiAgfVxuXG4gIHN0YXJ0KGV2KTogdm9pZCB7XG4gICAgdGhpcy5hbHRlci5zdGFydCgpO1xuICB9XG5cbiAgZG9uZShldik6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICBldi5lbGVtZW50LFxuICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICBgdHJhbnNsYXRlWSgke2V2LnRvU3RhdGV9cHgpYFxuICAgICk7XG4gICAgdGhpcy5hbHRlci5kb25lKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFsdGVybmF0aW9uID0gdGhpcy5hbHRlci5pbml0KHRoaXMuZWwsIHsgZGVsYXk6IHRoaXMuZGVsYXkgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBBbHRlcm5hdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vYWx0ZXJuYXRpb24uY29tcG9uZW50J1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbQWx0ZXJuYXRpb25Db21wb25lbnRdLFxuICBleHBvcnRzOiBbQWx0ZXJuYXRpb25Db21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEFsdGVybmF0aW9uTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIkJlaGF2aW9yU3ViamVjdCIsIkluamVjdGFibGUiLCJTY3JvbGxEaXNwYXRjaGVyIiwiTmdab25lIiwidHJpZ2dlciIsInRyYW5zaXRpb24iLCJhbmltYXRlIiwic3R5bGUiLCJDb21wb25lbnQiLCJSZW5kZXJlcjIiLCJEb21TYW5pdGl6ZXIiLCJFbGVtZW50UmVmIiwiSW5wdXQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBUUUscUJBQW9CLFVBQTRCLEVBQVUsSUFBWTtZQUFsRCxlQUFVLEdBQVYsVUFBVSxDQUFrQjtZQUFVLFNBQUksR0FBSixJQUFJLENBQVE7K0JBQ2xDLElBQUlBLG9CQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7MkJBQy9ELElBQUlBLG9CQUFlLENBQUMsS0FBSyxDQUFDO3lCQUM3QixJQUFJQSxvQkFBZSxDQUFDLENBQUMsQ0FBQzt5QkFDdkMsSUFBSTtTQUp1RDs7Ozs7O1FBTTNFLDhCQUFROzs7OztZQUFSLFVBQVMsS0FBSyxFQUFFLElBQUk7Z0JBQ2xCLE9BQU8sRUFBRSxLQUFLLE9BQUEsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQUEsRUFBRSxFQUFFLENBQUM7YUFDdEQ7Ozs7UUFFRCwwQkFBSTs7O1lBQUo7Z0JBQUEsaUJBU0M7Z0JBUkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRXpCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDZCxJQUFJLENBQUMs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
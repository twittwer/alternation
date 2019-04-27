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
class Alternation {
    /**
     * @param {?} dispatcher
     * @param {?} zone
     */
    constructor(dispatcher, zone) {
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
    position(value, time) {
        return { value, params: { next: value || 0, time } };
    }
    /**
     * @return {?}
     */
    done() {
        this.running.next(false);
        if (this._next) {
            this.zone.run(() => {
                this.alternation.next(this._next);
                this._next = null;
            });
        }
    }
    /**
     * @return {?}
     */
    start() {
        this.running.next(true);
    }
    /**
     * @param {?} el
     * @param {?=} options
     * @return {?}
     */
    init(el, options = { delay: null }) {
        this.dispatcher.scrolled(options.delay).subscribe((scrollable) => {
            if (scrollable) {
                const /** @type {?} */ $scrollable = scrollable.getElementRef().nativeElement;
                const /** @type {?} */ componentRect = el.nativeElement.getBoundingClientRect();
                const /** @type {?} */ difference = Math.round(componentRect.height - componentRect.height * 2);
                let /** @type {?} */ next = -Math.round($scrollable.scrollTop / 3);
                const /** @type {?} */ time = Math.abs(this.alternation.value.value - next) * 5;
                if (next < difference) {
                    next = difference;
                }
                const /** @type {?} */ position = this.position(next, time);
                if (this.running.value) {
                    this._next = position;
                    return;
                }
                if (next) {
                    this.zone.run(() => {
                        this.alternation.next(position);
                    });
                }
            }
        });
        return this.alternation;
    }
}
Alternation.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
Alternation.ctorParameters = () => [
    { type: ScrollDispatcher },
    { type: NgZone }
];
/** @nocollapse */ Alternation.ngInjectableDef = defineInjectable({ factory: function Alternation_Factory() { return new Alternation(inject(ScrollDispatcher), inject(NgZone)); }, token: Alternation, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ alternationTrigger = trigger('alternation', [
    transition('* => *', [
        animate('{{ time }}ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({ transform: 'translateY({{ next }}px)' })),
    ]),
]);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AlternationComponent {
    /**
     * @param {?} alter
     * @param {?} renderer
     * @param {?} dom
     * @param {?} el
     */
    constructor(alter, renderer, dom, el) {
        this.alter = alter;
        this.renderer = renderer;
        this.dom = dom;
        this.el = el;
        this.disabled = false;
    }
    /**
     * @return {?}
     */
    get safeSrc() {
        return this.src
            ? this.dom.bypassSecurityTrustStyle(`url(${this.src})`)
            : '';
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    start(ev) {
        this.alter.start();
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    done(ev) {
        this.renderer.setStyle(ev.element, 'transform', `translateY(${ev.toState}px)`);
        this.alter.done();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.alternation = this.alter.init(this.el, { delay: this.delay });
    }
}
AlternationComponent.decorators = [
    { type: Component, args: [{
                selector: 'alternation',
                animations: [alternationTrigger],
                styles: [`:host{position:relative;overflow:hidden;display:block;height:100%;width:100%}div.image{background-repeat:no-repeat;background-position:center;background-size:cover;will-change:transform;display:block;height:200%;width:100%}div.content{position:absolute;top:0;width:100%;height:100%}`],
                template: `
    <div
      class="image"
      [style.backgroundImage]="safeSrc"
      [@.disabled]="disabled"
      (@alternation.done)="done($event)"
      (@alternation.start)="start($event)"
      [@alternation]="alternation | async"
    ></div>
    <div class="content">
      <ng-content></ng-content>
    </div>
  `,
            },] },
];
/** @nocollapse */
AlternationComponent.ctorParameters = () => [
    { type: Alternation },
    { type: Renderer2 },
    { type: DomSanitizer },
    { type: ElementRef }
];
AlternationComponent.propDecorators = {
    disabled: [{ type: Input }],
    delay: [{ type: Input }],
    src: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AlternationModule {
}
AlternationModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [AlternationComponent],
                exports: [AlternationComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { Alternation, AlternationComponent, AlternationModule, alternationTrigger as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWx0ZXJuYXRpb24uanMubWFwIiwic291cmNlcyI6WyJuZzovL2FsdGVybmF0aW9uL2xpYi9hbHRlcm5hdGlvbi5zZXJ2aWNlLnRzIiwibmc6Ly9hbHRlcm5hdGlvbi9saWIvYWx0ZXJuYXRpb24udHJpZ2dlci50cyIsIm5nOi8vYWx0ZXJuYXRpb24vbGliL2FsdGVybmF0aW9uLmNvbXBvbmVudC50cyIsIm5nOi8vYWx0ZXJuYXRpb24vbGliL2FsdGVybmF0aW9uLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2Nyb2xsRGlzcGF0Y2hlciwgQ2RrU2Nyb2xsYWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBbHRlcm5hdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlciwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHsgfVxuICBhbHRlcm5hdGlvbjogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHsgdmFsdWU6IDAsIHBhcmFtczogeyBuZXh0OiAwLCB0aW1lOiAwIH0gfSk7XG4gIHJ1bm5pbmc6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuICBzcGVlZDogQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KDMpO1xuICBwcml2YXRlIF9uZXh0ID0gbnVsbDtcblxuICBwb3NpdGlvbih2YWx1ZSwgdGltZSkge1xuICAgIHJldHVybiB7IHZhbHVlLCBwYXJhbXM6IHsgbmV4dDogdmFsdWUgfHwgMCwgdGltZSB9IH07XG4gIH1cblxuICBkb25lKCkge1xuICAgIHRoaXMucnVubmluZy5uZXh0KGZhbHNlKTtcblxuICAgIGlmICh0aGlzLl9uZXh0KSB7XG4gICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5hbHRlcm5hdGlvbi5uZXh0KHRoaXMuX25leHQpO1xuICAgICAgICB0aGlzLl9uZXh0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMucnVubmluZy5uZXh0KHRydWUpO1xuICB9XG5cbiAgaW5pdChlbCwgb3B0aW9uczogeyBkZWxheT86IG51bWJlciB9ID0geyBkZWxheTogbnVsbCB9KSB7XG4gICAgdGhpcy5kaXNwYXRjaGVyLnNjcm9sbGVkKG9wdGlvbnMuZGVsYXkpLnN1YnNjcmliZSgoc2Nyb2xsYWJsZTogQ2RrU2Nyb2xsYWJsZSkgPT4ge1xuICAgICAgaWYgKHNjcm9sbGFibGUpIHtcbiAgICAgICAgY29uc3QgJHNjcm9sbGFibGU6IEhUTUxFbGVtZW50ID0gc2Nyb2xsYWJsZS5nZXRFbGVtZW50UmVmKCkubmF0aXZlRWxlbWVudDtcbiAgICAgICAgY29uc3QgY29tcG9uZW50UmVjdCA9IGVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IGRpZmZlcmVuY2UgPSBNYXRoLnJvdW5kKGNvbXBvbmVudFJlY3QuaGVpZ2h0IC0gY29tcG9uZW50UmVjdC5oZWlnaHQgKiAyKTtcbiAgICAgICAgbGV0IG5leHQgPSAtTWF0aC5yb3VuZCgkc2Nyb2xsYWJsZS5zY3JvbGxUb3AgLyAzKTtcbiAgICAgICAgY29uc3QgdGltZSA9IE1hdGguYWJzKHRoaXMuYWx0ZXJuYXRpb24udmFsdWUudmFsdWUgLSBuZXh0KSAqIDU7XG5cbiAgICAgICAgaWYgKG5leHQgPCBkaWZmZXJlbmNlKSB7XG4gICAgICAgICAgbmV4dCA9IGRpZmZlcmVuY2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb24obmV4dCwgdGltZSk7XG5cbiAgICAgICAgaWYgKHRoaXMucnVubmluZy52YWx1ZSkge1xuICAgICAgICAgIHRoaXMuX25leHQgPSBwb3NpdGlvbjtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV4dCkge1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hbHRlcm5hdGlvbi5uZXh0KHBvc2l0aW9uKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYWx0ZXJuYXRpb247XG4gIH1cbn1cbiIsImltcG9ydCB7IHRyaWdnZXIsIHN0eWxlLCB0cmFuc2l0aW9uLCBhbmltYXRlLCBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuZXhwb3J0IGNvbnN0IGFsdGVybmF0aW9uVHJpZ2dlcjogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhID0gdHJpZ2dlcignYWx0ZXJuYXRpb24nLCBbXG4gIHRyYW5zaXRpb24oJyogPT4gKicsIFtcbiAgICBhbmltYXRlKFxuICAgICAgJ3t7IHRpbWUgfX1tcyBjdWJpYy1iZXppZXIoMC4wLCAwLjAsIDAuMiwgMSknLFxuICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKHt7IG5leHQgfX1weCknIH0pXG4gICAgKSxcbiAgXSksXG5dKTtcbiIsImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE9uSW5pdCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVTdHlsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgQWx0ZXJuYXRpb24gfSBmcm9tICcuL2FsdGVybmF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgYWx0ZXJuYXRpb25UcmlnZ2VyIH0gZnJvbSAnLi9hbHRlcm5hdGlvbi50cmlnZ2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWx0ZXJuYXRpb24nLFxuICBhbmltYXRpb25zOiBbYWx0ZXJuYXRpb25UcmlnZ2VyXSxcbiAgc3R5bGVzOiBbYDpob3N0e3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbjtkaXNwbGF5OmJsb2NrO2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9ZGl2LmltYWdle2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlcjtiYWNrZ3JvdW5kLXNpemU6Y292ZXI7d2lsbC1jaGFuZ2U6dHJhbnNmb3JtO2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjIwMCU7d2lkdGg6MTAwJX1kaXYuY29udGVudHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfWBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwiaW1hZ2VcIlxuICAgICAgW3N0eWxlLmJhY2tncm91bmRJbWFnZV09XCJzYWZlU3JjXCJcbiAgICAgIFtALmRpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgIChAYWx0ZXJuYXRpb24uZG9uZSk9XCJkb25lKCRldmVudClcIlxuICAgICAgKEBhbHRlcm5hdGlvbi5zdGFydCk9XCJzdGFydCgkZXZlbnQpXCJcbiAgICAgIFtAYWx0ZXJuYXRpb25dPVwiYWx0ZXJuYXRpb24gfCBhc3luY1wiXG4gICAgPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIEFsdGVybmF0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGFsdGVyOiBBbHRlcm5hdGlvbixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBkb206IERvbVNhbml0aXplcixcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmXG4gICkge31cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgZGVsYXk6IG51bWJlcjtcbiAgQElucHV0KCkgc3JjOiBzdHJpbmc7XG4gIGFsdGVybmF0aW9uO1xuXG4gIGdldCBzYWZlU3JjKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc3JjXG4gICAgICA/IHRoaXMuZG9tLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShgdXJsKCR7dGhpcy5zcmN9KWApXG4gICAgICA6ICcnO1xuICB9XG5cbiAgc3RhcnQoZXYpOiB2b2lkIHtcbiAgICB0aGlzLmFsdGVyLnN0YXJ0KCk7XG4gIH1cblxuICBkb25lKGV2KTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgIGV2LmVsZW1lbnQsXG4gICAgICAndHJhbnNmb3JtJyxcbiAgICAgIGB0cmFuc2xhdGVZKCR7ZXYudG9TdGF0ZX1weClgXG4gICAgKTtcbiAgICB0aGlzLmFsdGVyLmRvbmUoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYWx0ZXJuYXRpb24gPSB0aGlzLmFsdGVyLmluaXQodGhpcy5lbCwgeyBkZWxheTogdGhpcy5kZWxheSB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IEFsdGVybmF0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9hbHRlcm5hdGlvbi5jb21wb25lbnQnXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtBbHRlcm5hdGlvbkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtBbHRlcm5hdGlvbkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQWx0ZXJuYXRpb25Nb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7SUFRRSxZQUFvQixVQUE0QixFQUFVLElBQVk7UUFBbEQsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFROzJCQUNsQyxJQUFJLGVBQWUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt1QkFDL0QsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDO3FCQUM3QixJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUM7cUJBQ3ZDLElBQUk7S0FKdUQ7Ozs7OztJQU0zRSxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUk7UUFDbEIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO0tBQ3REOzs7O0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXpCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7YUFDbkIsQ0FBQyxDQUFDO1NBQ0o7S0FDRjs7OztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN6Qjs7Ozs7O0lBRUQsSUFBSSxDQUFDLEVBQUUsRUFBRSxVQUE4QixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7UUFDcEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQXlCO1lBQzFFLElBQUksVUFBVSxFQUFFO2dCQUNkLHVCQUFNLFdBQVcsR0FBZ0IsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDMUUsdUJBQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFDL0QsdUJBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMvRSxxQkFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELHVCQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRS9ELElBQUksSUFBSSxHQUFHLFVBQVUsRUFBRTtvQkFDckIsSUFBSSxHQUFHLFVBQVUsQ0FBQztpQkFDbkI7Z0JBRUQsdUJBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUUzQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO29CQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztvQkFDdEIsT0FBTztpQkFDUjtnQkFFRCxJQUFJLElBQUksRUFBRTtvQkFDUixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzt3QkFDWixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDakMsQ0FBQyxDQUFDO2lCQUNKO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7S0FDekI7OztZQTFERixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFKUSxnQkFBZ0I7WUFGSixNQUFNOzs7Ozs7OztBQ0EzQix1QkFFYSxrQkFBa0IsR0FBNkIsT0FBTyxDQUFDLGFBQWEsRUFBRTtJQUNqRixVQUFVLENBQUMsUUFBUSxFQUFFO1FBQ25CLE9BQU8sQ0FDTCw2Q0FBNkMsRUFDN0MsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLDBCQUEwQixFQUFFLENBQUMsQ0FDakQ7S0FDRixDQUFDO0NBQ0gsQ0FBQzs7Ozs7O0FDVEY7Ozs7Ozs7SUF3QkUsWUFDUyxPQUNDLFVBQ0EsS0FDQTtRQUhELFVBQUssR0FBTCxLQUFLO1FBQ0osYUFBUSxHQUFSLFFBQVE7UUFDUixRQUFHLEdBQUgsR0FBRztRQUNILE9BQUUsR0FBRixFQUFFO3dCQUVpQixLQUFLO0tBRDlCOzs7O0lBTUosSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsR0FBRztjQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7Y0FDckQsRUFBRSxDQUFDO0tBQ1I7Ozs7O0lBRUQsS0FBSyxDQUFDLEVBQUU7UUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ3BCOzs7OztJQUVELElBQUksQ0FBQyxFQUFFO1FBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQ3BCLEVBQUUsQ0FBQyxPQUFPLEVBQ1YsV0FBVyxFQUNYLGNBQWMsRUFBRSxDQUFDLE9BQU8sS0FBSyxDQUM5QixDQUFDO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNuQjs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7S0FDcEU7OztZQW5ERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFVBQVUsRUFBRSxDQUFDLGtCQUFrQixDQUFDO2dCQUNoQyxNQUFNLEVBQUUsQ0FBQyw0UkFBNFIsQ0FBQztnQkFDdFMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7R0FZVDthQUNGOzs7O1lBcEJRLFdBQVc7WUFGMkIsU0FBUztZQUMvQyxZQUFZO1lBREQsVUFBVTs7O3VCQThCM0IsS0FBSztvQkFDTCxLQUFLO2tCQUNMLEtBQUs7Ozs7Ozs7QUNoQ1I7OztZQUtDLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLFlBQVksRUFBRSxDQUFDLG9CQUFvQixDQUFDO2dCQUNwQyxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQzthQUNoQzs7Ozs7Ozs7Ozs7Ozs7OyJ9
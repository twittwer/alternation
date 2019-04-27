/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/scrolling";
export class Alternation {
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
/** @nocollapse */ Alternation.ngInjectableDef = i0.defineInjectable({ factory: function Alternation_Factory() { return new Alternation(i0.inject(i1.ScrollDispatcher), i0.inject(i0.NgZone)); }, token: Alternation, providedIn: "root" });
function Alternation_tsickle_Closure_declarations() {
    /** @type {?} */
    Alternation.prototype.alternation;
    /** @type {?} */
    Alternation.prototype.running;
    /** @type {?} */
    Alternation.prototype.speed;
    /** @type {?} */
    Alternation.prototype._next;
    /** @type {?} */
    Alternation.prototype.dispatcher;
    /** @type {?} */
    Alternation.prototype.zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWx0ZXJuYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FsdGVybmF0aW9uLyIsInNvdXJjZXMiOlsibGliL2FsdGVybmF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBVyxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFFLGdCQUFnQixFQUFpQixNQUFNLHdCQUF3QixDQUFDOzs7QUFLekUsTUFBTTs7Ozs7SUFDSixZQUFvQixVQUE0QixFQUFVLElBQVk7UUFBbEQsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFROzJCQUNsQyxJQUFJLGVBQWUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt1QkFDL0QsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDO3FCQUM3QixJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUM7cUJBQ3ZDLElBQUk7S0FKdUQ7Ozs7OztJQU0zRSxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUk7UUFDbEIsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7S0FDdEQ7Ozs7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFekIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7YUFDbkIsQ0FBQyxDQUFDO1NBQ0o7S0FDRjs7OztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN6Qjs7Ozs7O0lBRUQsSUFBSSxDQUFDLEVBQUUsRUFBRSxVQUE4QixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7UUFDcEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQXlCLEVBQUUsRUFBRTtZQUM5RSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNmLHVCQUFNLFdBQVcsR0FBZ0IsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDMUUsdUJBQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFDL0QsdUJBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMvRSxxQkFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELHVCQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRS9ELEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUN0QixJQUFJLEdBQUcsVUFBVSxDQUFDO2lCQUNuQjtnQkFFRCx1QkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRTNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7b0JBQ3RCLE1BQU0sQ0FBQztpQkFDUjtnQkFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNULElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTt3QkFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQ2pDLENBQUMsQ0FBQztpQkFDSjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7S0FDekI7OztZQTFERixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFKUSxnQkFBZ0I7WUFGSixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNjcm9sbERpc3BhdGNoZXIsIENka1Njcm9sbGFibGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQWx0ZXJuYXRpb24ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpc3BhdGNoZXI6IFNjcm9sbERpc3BhdGNoZXIsIHByaXZhdGUgem9uZTogTmdab25lKSB7IH1cbiAgYWx0ZXJuYXRpb246IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh7IHZhbHVlOiAwLCBwYXJhbXM6IHsgbmV4dDogMCwgdGltZTogMCB9IH0pO1xuICBydW5uaW5nOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcbiAgc3BlZWQ6IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCgzKTtcbiAgcHJpdmF0ZSBfbmV4dCA9IG51bGw7XG5cbiAgcG9zaXRpb24odmFsdWUsIHRpbWUpIHtcbiAgICByZXR1cm4geyB2YWx1ZSwgcGFyYW1zOiB7IG5leHQ6IHZhbHVlIHx8IDAsIHRpbWUgfSB9O1xuICB9XG5cbiAgZG9uZSgpIHtcbiAgICB0aGlzLnJ1bm5pbmcubmV4dChmYWxzZSk7XG5cbiAgICBpZiAodGhpcy5fbmV4dCkge1xuICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgIHRoaXMuYWx0ZXJuYXRpb24ubmV4dCh0aGlzLl9uZXh0KTtcbiAgICAgICAgdGhpcy5fbmV4dCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB0aGlzLnJ1bm5pbmcubmV4dCh0cnVlKTtcbiAgfVxuXG4gIGluaXQoZWwsIG9wdGlvbnM6IHsgZGVsYXk/OiBudW1iZXIgfSA9IHsgZGVsYXk6IG51bGwgfSkge1xuICAgIHRoaXMuZGlzcGF0Y2hlci5zY3JvbGxlZChvcHRpb25zLmRlbGF5KS5zdWJzY3JpYmUoKHNjcm9sbGFibGU6IENka1Njcm9sbGFibGUpID0+IHtcbiAgICAgIGlmIChzY3JvbGxhYmxlKSB7XG4gICAgICAgIGNvbnN0ICRzY3JvbGxhYmxlOiBIVE1MRWxlbWVudCA9IHNjcm9sbGFibGUuZ2V0RWxlbWVudFJlZigpLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFJlY3QgPSBlbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCBkaWZmZXJlbmNlID0gTWF0aC5yb3VuZChjb21wb25lbnRSZWN0LmhlaWdodCAtIGNvbXBvbmVudFJlY3QuaGVpZ2h0ICogMik7XG4gICAgICAgIGxldCBuZXh0ID0gLU1hdGgucm91bmQoJHNjcm9sbGFibGUuc2Nyb2xsVG9wIC8gMyk7XG4gICAgICAgIGNvbnN0IHRpbWUgPSBNYXRoLmFicyh0aGlzLmFsdGVybmF0aW9uLnZhbHVlLnZhbHVlIC0gbmV4dCkgKiA1O1xuXG4gICAgICAgIGlmIChuZXh0IDwgZGlmZmVyZW5jZSkge1xuICAgICAgICAgIG5leHQgPSBkaWZmZXJlbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uKG5leHQsIHRpbWUpO1xuXG4gICAgICAgIGlmICh0aGlzLnJ1bm5pbmcudmFsdWUpIHtcbiAgICAgICAgICB0aGlzLl9uZXh0ID0gcG9zaXRpb247XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWx0ZXJuYXRpb24ubmV4dChwb3NpdGlvbik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFsdGVybmF0aW9uO1xuICB9XG59XG4iXX0=
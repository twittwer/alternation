/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/scrolling";
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
    /** @nocollapse */ Alternation.ngInjectableDef = i0.defineInjectable({ factory: function Alternation_Factory() { return new Alternation(i0.inject(i1.ScrollDispatcher), i0.inject(i0.NgZone)); }, token: Alternation, providedIn: "root" });
    return Alternation;
}());
export { Alternation };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWx0ZXJuYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FsdGVybmF0aW9uLyIsInNvdXJjZXMiOlsibGliL2FsdGVybmF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBVyxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFFLGdCQUFnQixFQUFpQixNQUFNLHdCQUF3QixDQUFDOzs7O0lBTXZFLHFCQUFvQixVQUE0QixFQUFVLElBQVk7UUFBbEQsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFROzJCQUNsQyxJQUFJLGVBQWUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt1QkFDL0QsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDO3FCQUM3QixJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUM7cUJBQ3ZDLElBQUk7S0FKdUQ7Ozs7OztJQU0zRSw4QkFBUTs7Ozs7SUFBUixVQUFTLEtBQUssRUFBRSxJQUFJO1FBQ2xCLE1BQU0sQ0FBQyxFQUFFLEtBQUssT0FBQSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLElBQUksTUFBQSxFQUFFLEVBQUUsQ0FBQztLQUN0RDs7OztJQUVELDBCQUFJOzs7SUFBSjtRQUFBLGlCQVNDO1FBUkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFekIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDWixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xDLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2FBQ25CLENBQUMsQ0FBQztTQUNKO0tBQ0Y7Ozs7SUFFRCwyQkFBSzs7O0lBQUw7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN6Qjs7Ozs7O0lBRUQsMEJBQUk7Ozs7O0lBQUosVUFBSyxFQUFFLEVBQUUsT0FBNkM7UUFBdEQsaUJBNkJDO1FBN0JRLHdCQUFBLEVBQUEsWUFBZ0MsS0FBSyxFQUFFLElBQUksRUFBRTtRQUNwRCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsVUFBeUI7WUFDMUUsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDZixxQkFBTSxXQUFXLEdBQWdCLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0JBQzFFLHFCQUFNLGFBQWEsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7Z0JBQy9ELHFCQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDL0UscUJBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxxQkFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUUvRCxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDdEIsSUFBSSxHQUFHLFVBQVUsQ0FBQztpQkFDbkI7Z0JBRUQscUJBQU0sVUFBUSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUUzQyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLEtBQUksQ0FBQyxLQUFLLEdBQUcsVUFBUSxDQUFDO29CQUN0QixNQUFNLENBQUM7aUJBQ1I7Z0JBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVCxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzt3QkFDWixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFRLENBQUMsQ0FBQztxQkFDakMsQ0FBQyxDQUFDO2lCQUNKO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztLQUN6Qjs7Z0JBMURGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBSlEsZ0JBQWdCO2dCQUZKLE1BQU07OztzQkFBM0I7O1NBT2EsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTY3JvbGxEaXNwYXRjaGVyLCBDZGtTY3JvbGxhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEFsdGVybmF0aW9uIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkaXNwYXRjaGVyOiBTY3JvbGxEaXNwYXRjaGVyLCBwcml2YXRlIHpvbmU6IE5nWm9uZSkgeyB9XG4gIGFsdGVybmF0aW9uOiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QoeyB2YWx1ZTogMCwgcGFyYW1zOiB7IG5leHQ6IDAsIHRpbWU6IDAgfSB9KTtcbiAgcnVubmluZzogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG4gIHNwZWVkOiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoMyk7XG4gIHByaXZhdGUgX25leHQgPSBudWxsO1xuXG4gIHBvc2l0aW9uKHZhbHVlLCB0aW1lKSB7XG4gICAgcmV0dXJuIHsgdmFsdWUsIHBhcmFtczogeyBuZXh0OiB2YWx1ZSB8fCAwLCB0aW1lIH0gfTtcbiAgfVxuXG4gIGRvbmUoKSB7XG4gICAgdGhpcy5ydW5uaW5nLm5leHQoZmFsc2UpO1xuXG4gICAgaWYgKHRoaXMuX25leHQpIHtcbiAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmFsdGVybmF0aW9uLm5leHQodGhpcy5fbmV4dCk7XG4gICAgICAgIHRoaXMuX25leHQgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgdGhpcy5ydW5uaW5nLm5leHQodHJ1ZSk7XG4gIH1cblxuICBpbml0KGVsLCBvcHRpb25zOiB7IGRlbGF5PzogbnVtYmVyIH0gPSB7IGRlbGF5OiBudWxsIH0pIHtcbiAgICB0aGlzLmRpc3BhdGNoZXIuc2Nyb2xsZWQob3B0aW9ucy5kZWxheSkuc3Vic2NyaWJlKChzY3JvbGxhYmxlOiBDZGtTY3JvbGxhYmxlKSA9PiB7XG4gICAgICBpZiAoc2Nyb2xsYWJsZSkge1xuICAgICAgICBjb25zdCAkc2Nyb2xsYWJsZTogSFRNTEVsZW1lbnQgPSBzY3JvbGxhYmxlLmdldEVsZW1lbnRSZWYoKS5uYXRpdmVFbGVtZW50O1xuICAgICAgICBjb25zdCBjb21wb25lbnRSZWN0ID0gZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3QgZGlmZmVyZW5jZSA9IE1hdGgucm91bmQoY29tcG9uZW50UmVjdC5oZWlnaHQgLSBjb21wb25lbnRSZWN0LmhlaWdodCAqIDIpO1xuICAgICAgICBsZXQgbmV4dCA9IC1NYXRoLnJvdW5kKCRzY3JvbGxhYmxlLnNjcm9sbFRvcCAvIDMpO1xuICAgICAgICBjb25zdCB0aW1lID0gTWF0aC5hYnModGhpcy5hbHRlcm5hdGlvbi52YWx1ZS52YWx1ZSAtIG5leHQpICogNTtcblxuICAgICAgICBpZiAobmV4dCA8IGRpZmZlcmVuY2UpIHtcbiAgICAgICAgICBuZXh0ID0gZGlmZmVyZW5jZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbihuZXh0LCB0aW1lKTtcblxuICAgICAgICBpZiAodGhpcy5ydW5uaW5nLnZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5fbmV4dCA9IHBvc2l0aW9uO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFsdGVybmF0aW9uLm5leHQocG9zaXRpb24pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hbHRlcm5hdGlvbjtcbiAgfVxufVxuIl19
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Alternation } from './alternation.service';
import { alternationTrigger } from './alternation.trigger';
export class AlternationComponent {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWx0ZXJuYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYWx0ZXJuYXRpb24vIiwic291cmNlcyI6WyJsaWIvYWx0ZXJuYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQVUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxZQUFZLEVBQWEsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFvQjNELE1BQU07Ozs7Ozs7SUFDSixZQUNTLE9BQ0MsVUFDQSxLQUNBO1FBSEQsVUFBSyxHQUFMLEtBQUs7UUFDSixhQUFRLEdBQVIsUUFBUTtRQUNSLFFBQUcsR0FBSCxHQUFHO1FBQ0gsT0FBRSxHQUFGLEVBQUU7d0JBRWlCLEtBQUs7S0FEOUI7Ozs7SUFNSixJQUFJLE9BQU87UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUc7WUFDYixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUN2RCxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQ1I7Ozs7O0lBRUQsS0FBSyxDQUFDLEVBQUU7UUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ3BCOzs7OztJQUVELElBQUksQ0FBQyxFQUFFO1FBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQ3BCLEVBQUUsQ0FBQyxPQUFPLEVBQ1YsV0FBVyxFQUNYLGNBQWMsRUFBRSxDQUFDLE9BQU8sS0FBSyxDQUM5QixDQUFDO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNuQjs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7S0FDcEU7OztZQW5ERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFVBQVUsRUFBRSxDQUFDLGtCQUFrQixDQUFDO2dCQUNoQyxNQUFNLEVBQUUsQ0FBQyw0UkFBNFIsQ0FBQztnQkFDdFMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7R0FZVDthQUNGOzs7O1lBcEJRLFdBQVc7WUFGMkIsU0FBUztZQUMvQyxZQUFZO1lBREQsVUFBVTs7O3VCQThCM0IsS0FBSztvQkFDTCxLQUFLO2tCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlU3R5bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEFsdGVybmF0aW9uIH0gZnJvbSAnLi9hbHRlcm5hdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IGFsdGVybmF0aW9uVHJpZ2dlciB9IGZyb20gJy4vYWx0ZXJuYXRpb24udHJpZ2dlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FsdGVybmF0aW9uJyxcbiAgYW5pbWF0aW9uczogW2FsdGVybmF0aW9uVHJpZ2dlcl0sXG4gIHN0eWxlczogW2A6aG9zdHtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW47ZGlzcGxheTpibG9jaztoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfWRpdi5pbWFnZXtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXI7YmFja2dyb3VuZC1zaXplOmNvdmVyO3dpbGwtY2hhbmdlOnRyYW5zZm9ybTtkaXNwbGF5OmJsb2NrO2hlaWdodDoyMDAlO3dpZHRoOjEwMCV9ZGl2LmNvbnRlbnR7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX1gXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cImltYWdlXCJcbiAgICAgIFtzdHlsZS5iYWNrZ3JvdW5kSW1hZ2VdPVwic2FmZVNyY1wiXG4gICAgICBbQC5kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAoQGFsdGVybmF0aW9uLmRvbmUpPVwiZG9uZSgkZXZlbnQpXCJcbiAgICAgIChAYWx0ZXJuYXRpb24uc3RhcnQpPVwic3RhcnQoJGV2ZW50KVwiXG4gICAgICBbQGFsdGVybmF0aW9uXT1cImFsdGVybmF0aW9uIHwgYXN5bmNcIlxuICAgID48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBBbHRlcm5hdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBhbHRlcjogQWx0ZXJuYXRpb24sXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZG9tOiBEb21TYW5pdGl6ZXIsXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZlxuICApIHt9XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRlbGF5OiBudW1iZXI7XG4gIEBJbnB1dCgpIHNyYzogc3RyaW5nO1xuICBhbHRlcm5hdGlvbjtcblxuICBnZXQgc2FmZVNyYygpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNyY1xuICAgICAgPyB0aGlzLmRvbS5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoYHVybCgke3RoaXMuc3JjfSlgKVxuICAgICAgOiAnJztcbiAgfVxuXG4gIHN0YXJ0KGV2KTogdm9pZCB7XG4gICAgdGhpcy5hbHRlci5zdGFydCgpO1xuICB9XG5cbiAgZG9uZShldik6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICBldi5lbGVtZW50LFxuICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICBgdHJhbnNsYXRlWSgke2V2LnRvU3RhdGV9cHgpYFxuICAgICk7XG4gICAgdGhpcy5hbHRlci5kb25lKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFsdGVybmF0aW9uID0gdGhpcy5hbHRlci5pbml0KHRoaXMuZWwsIHsgZGVsYXk6IHRoaXMuZGVsYXkgfSk7XG4gIH1cbn1cbiJdfQ==
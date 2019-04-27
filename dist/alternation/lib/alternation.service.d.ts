import { NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
export declare class Alternation {
    private dispatcher;
    private zone;
    constructor(dispatcher: ScrollDispatcher, zone: NgZone);
    alternation: BehaviorSubject<any>;
    running: BehaviorSubject<boolean>;
    speed: BehaviorSubject<number>;
    private _next;
    position(value: any, time: any): {
        value: any;
        params: {
            next: any;
            time: any;
        };
    };
    done(): void;
    start(): void;
    init(el: any, options?: {
        delay?: number;
    }): BehaviorSubject<any>;
}

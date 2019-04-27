import { ElementRef, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Alternation } from './alternation.service';
export declare class AlternationComponent implements OnInit {
    alter: Alternation;
    private renderer;
    private dom;
    private el;
    constructor(alter: Alternation, renderer: Renderer2, dom: DomSanitizer, el: ElementRef);
    disabled: boolean;
    delay: number;
    src: string;
    alternation: any;
    readonly safeSrc: SafeStyle;
    start(ev: any): void;
    done(ev: any): void;
    ngOnInit(): void;
}

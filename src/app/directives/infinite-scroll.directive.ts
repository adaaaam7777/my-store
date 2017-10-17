import { Directive, AfterViewInit, ElementRef, Input } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';
import { ScrollPosition } from '../interfaces/scroll-position.interface';

const DEFAULT_SCROLL_POSITION: ScrollPosition = {
	scrollHeight: 0,
	scrollTop: 0,
	clientHeight: 0
};

@Directive( {
	selector: '[appInfiniteScroller]'
} )
export class InfiniteScrollerDirective implements AfterViewInit {

	private scrollEvent$;

	private userScrolledDown$;

	private requestOnScroll$;

	@Input() scrollCallback;

	@Input() immediateCallback;

	@Input() scrollPercent = 70;

	constructor( private elm: ElementRef ) {
		console.log( 'element: ', this.elm.nativeElement );
	}

	ngAfterViewInit() {
		console.log( 'so.....' );

		this.registerScrollEvent();

		this.scrollEvent$.subscribe( () => {
			console.log( 'yo......1 ' );
		} );

		this.streamScrollEvents();

		this.requestCallbackOnScroll();

	}

	private registerScrollEvent() {

		this.scrollEvent$ = Observable.fromEvent( this.elm.nativeElement, 'scroll' );
}

	private streamScrollEvents() {
		this.userScrolledDown$ = this.scrollEvent$
			.do( ( e ) => console.log( e ) )
			.map( ( e: any ): ScrollPosition => ( {
				scrollHeight: e.target.scrollHeight,
				scrollTop: e.target.scrollTop,
				clientHeight: e.target.clientHeight
			} ) )
			.pairwise()
			.filter( positions => this.isUserScrollingDown( positions ) && this.isScrollExpectedPercent( positions[ 1 ] ) );
	}

	private requestCallbackOnScroll() {

		this.requestOnScroll$ = this.userScrolledDown$;

		if ( this.immediateCallback ) {
			this.requestOnScroll$ = this.requestOnScroll$
				.startWith( [ DEFAULT_SCROLL_POSITION, DEFAULT_SCROLL_POSITION ] );
		}

		this.requestOnScroll$
			.exhaustMap( () => {
				return this.scrollCallback();
			} )
			.subscribe( () => {
			} );
	}

	private isUserScrollingDown = ( positions ) => {
		console.log( positions[ 0 ].scrollTop );
		console.log( positions[ 1 ].scrollTop );
		console.log( 'isuserscrollingdown ', positions[ 0 ].scrollTop < positions[ 1 ].scrollTop );
		return positions[ 0 ].scrollTop < positions[ 1 ].scrollTop;
	}

	private isScrollExpectedPercent = ( position ) => {
		console.log( 'isScrollExpectedPercent ', ( position.scrollTop + position.clientHeight ) / position.scrollHeight ) ,'.....',  ( this.scrollPercent / 100 );
		return ( ( position.scrollTop + position.clientHeight ) / position.scrollHeight ) > ( this.scrollPercent / 100 );
	}
}

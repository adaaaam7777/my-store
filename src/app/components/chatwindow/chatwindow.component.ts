import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../services/auth.service';
import { User } from '../../data/user/user.data';
import { Observable } from 'rxjs';

@Component( {
	selector: 'app-chatwindow',
	templateUrl: './chatwindow.component.html',
	styleUrls: ['./chatwindow.component.css']
} )
export class ChatWindowComponent implements OnInit, AfterViewChecked {

	@Input() user: User = { uid: null, displayName: 'Anon' };
	@ViewChild( 'scrollWindow' ) private scrollContainer: ElementRef;

	items: Observable<any[]>;
	shownItems: any[];
	isLoggedIn: boolean;
	msgVal = '';
	randomChatColor;

	constructor(
		public angularFire: AngularFireDatabase,
		private authService: AuthService,
		private elementRef: ElementRef
	) {
		this.authService.authStateChanged.subscribe( ( auth ) => {
			if ( auth === 'login' ) {
				console.log( 'login!' );
				this.isLoggedIn = true;
				this.items = angularFire.list( '/messages', ref => ref.limitToLast( 5 ) ).valueChanges();
				this.items.first().subscribe( ( messages: any[] ) => this.shownItems = messages );
			} else {
				console.log( 'logout!' );
				this.isLoggedIn = false;
			}
		} );

		this.randomChatColor = '#' + Math.floor( Math.random() * 16777215 ).toString( 16 );
	}

	ngOnInit() {
	}

	ngAfterViewChecked() {
		this.scrollToBottom();
	}

	chatSend( chatMessage: string ) {
		this.angularFire.list( '/messages' ).push( { message: chatMessage, name: this.user.displayName } );
		this.shownItems.push( { message: chatMessage, name: this.user.displayName } );
		this.msgVal = '';
	}

	scrollToBottom(): void {
		try {
			this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
		} catch ( err ) { }
	}

}

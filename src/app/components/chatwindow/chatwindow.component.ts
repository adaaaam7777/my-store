import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
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
	authState: any = null;
	msgVal = '';

	constructor( public angularFire: AngularFireDatabase,
				 private authService: AuthService,
				 private elementRef: ElementRef
	) {
		this.items = angularFire.list( '/messages', ref => ref.limitToLast( 5 ) ).valueChanges();
		this.items.first().subscribe( ( messages: any[] ) => this.shownItems = messages );
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

	onScroll( event ) {
		console.log( 'stopped propagation ' );
	}

}

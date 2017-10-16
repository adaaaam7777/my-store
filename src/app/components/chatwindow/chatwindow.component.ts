import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthService } from '../services/auth.service';
import { User } from '../../data/user/user.data';
import { Observable } from 'rxjs';

@Component( {
	selector: 'app-chatwindow',
	templateUrl: './chatwindow.component.html',
	styleUrls: ['./chatwindow.component.css']
} )
export class ChatWindowComponent implements OnInit {

	@Input() user: User = { uid: null, displayName: 'Anon' };

	items: Observable<any[]>;
	authState: any = null;
	msgVal = '';

	constructor( public angularFire: AngularFireDatabase, private authService: AuthService ) {
		this.items = angularFire.list( '/messages', ref => ref.limitToLast( 5 ) ).valueChanges();
		console.log( 'last 5 messages:', this.items );

	}

	ngOnInit() {
	}

	chatSend( chatMessage: string ) {
		this.angularFire.list( '/messages' ).push( { message: chatMessage, name: this.user.displayName } );
		console.log( 'ha: ', this.items );
		this.msgVal = '';
	}

	onScroll( event ) {
		console.log( 'stopped propagation ' );
	}

}

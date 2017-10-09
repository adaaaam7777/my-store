import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthService } from '../services/auth.service';

@Component( {
	selector: 'app-chatwindow',
	templateUrl: './chatwindow.component.html',
	styleUrls: ['./chatwindow.component.css']
} )
export class ChatwindowComponent implements OnInit {

	items: AngularFireList<any>;
	authState: any = null;
	msgVal = '';

	constructor( public angularFire: AngularFireDatabase, authService: AuthService ) {
		this.items = angularFire.list( '/messages', ref => ref.limitToLast( 5 ) );
		console.log( 'last 5 messages:', this.items );

	}

	ngOnInit() {
	}

}

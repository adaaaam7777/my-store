import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { User } from './data/user/user.data';
import { AppState } from './reducers/index';
import * as userActions from './actions/user.actions';

@Component( {
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
} )
export class AppComponent implements OnInit{
	title = 'Cryptocurrency Chat';

	user$: Observable<User>;

	constructor( private store: Store<AppState> ) {};

	ngOnInit() {
		this.user$ = this.store.select( 'user' );
		this.store.dispatch( new userActions.GetUser() );
	}

	googleLogin() {
		this.store.dispatch( new userActions.GoogleLogin() );
	}

	logout() {
		this.store.dispatch( new userActions.Logout() );
	}

	onLogin() {
		this.googleLogin();
	}

	onLogout() {
		this.logout();
	}

}

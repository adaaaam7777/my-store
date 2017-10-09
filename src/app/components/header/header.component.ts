import { Component, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../../data/user/user.data';

@Component( {
	selector: 'cc-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
} )
export class HeaderComponent {

	@Input() user: User;

	@Output() logout = new EventEmitter<string>();
	@Output() login = new EventEmitter<string>();

	onLogout() {
		this.logout.emit( 'logout' );
	}

	onLogin() {
		this.login.emit( 'login' );
	}


}

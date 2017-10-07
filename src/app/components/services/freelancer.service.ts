import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http } from '@angular/http';
import { FREELANCER_ACTIONS, AppState, IFreelancer } from '../../reducers/freelancers.reducer';

@Injectable()
export class RealtimeFreelancersService {

	private USER_API_URL = 'https://swapi.co/api/people';

	constructor( private store: Store<AppState>, private http: Http ) { }

	private toFreelancer( value: any ) {
		return {
				name: value.name,
				email: value.height,
				thumbnail: value.url
		};
	}

	private random( y ) {
		return Math.floor( Math.random() * y );
	}

	public run() {
		this.http.get( `${this.USER_API_URL}` ).subscribe( ( response ) => {
			console.log( 'woo: ', response.json().results );
			this.store.dispatch( {
				type: FREELANCER_ACTIONS.FREELANCERS_LOADED,
				payload: {
					freelancer: response.json().results.map( this.toFreelancer )
				}
			} );
		} );
	}
}

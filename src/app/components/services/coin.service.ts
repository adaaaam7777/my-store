import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http } from '@angular/http';
import { COIN_ACTIONS } from '../../reducers/coins.reducer';
import { AppState } from '../../reducers/index';

@Injectable()
export class RealtimeCoinsService {

	private USER_API_URL = 'https://swapi.co/api/people';
	private CMC_URL = 'https://api.coinmarketcap.com/v1/ticker/';

	constructor( private store: Store<AppState>, private http: Http ) { }

	private toCoin( value: any ) {
		return {
				name: value.name,
				rank: value.rank,
				thumbnail: value.url
		};
	}

	private random( y ) {
		return Math.floor( Math.random() * y );
	}

	public run() {
		this.http.get( `${this.CMC_URL}` ).subscribe( ( response ) => {
			console.log( 'woo: ', response.json().results );
			this.store.dispatch( {
				type: COIN_ACTIONS.COINS_LOADED,
				payload: {
					coin: response.json().map( this.toCoin )
				}
			} );
		} );
	}
}

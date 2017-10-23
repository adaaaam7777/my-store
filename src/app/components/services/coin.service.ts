import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http } from '@angular/http';
import { COIN_ACTIONS } from '../../reducers/coins.reducer';
import { AppState } from '../../reducers/index';

@Injectable()
export class RealtimeCoinsService {

	private CMC_URL = 'https://api.coinmarketcap.com/v1/ticker/';

	constructor( private store: Store<AppState>, private http: Http ) { }

	private toCoin( value: any ) {
		return {
				name: value.name,
				rank: value.rank,
				thumbnail: value.url,
				symbol: value.symbol,
				price_usd: value.price_usd,
				price_btc: value.price_btc,
				_24_h_volume_usd: value['24h_volume_usd'],
				market_cap_usd: value.market_cap_usd,
				available_supply: value.available_supply,
				total_supply: value.total_supply,
				percent_change_1h: value.percent_change_1h,
				percent_change_24h: value.percent_change_24h,
				percent_change_7d: value.percent_change_7d,
				last_updated: value.last_updated
		};
	}

	public run() {
		this.http.get( `${this.CMC_URL}` ).subscribe( ( response ) => {
			this.store.dispatch( {
				type: COIN_ACTIONS.COINS_LOADED,
				payload: {
					coin: response.json().map( this.toCoin )
				}
			} );
		} );
	}
}

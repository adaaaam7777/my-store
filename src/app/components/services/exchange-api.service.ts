import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http } from '@angular/http';
import { COIN_ACTIONS } from '../../reducers/coins.reducer';
import { AppState } from '../../reducers/index';
import { EXCHANGES_ACTIONS } from '../../reducers/exchanges.reducer';

@Injectable()
export class ExchangeApiService {

	private POLONIEX_URL = 'https://poloniex.com/public?command=returnCurrencies';
	private BITTREX_URL = 'https://bittrex.com/api/v1.1/public/getmarketsummaries';
	private KRAKEN_URL = 'https://api.kraken.com/0/public/Ticker';

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
		this.getBittrexCoins().subscribe( ( data ) => {

		} );
	}

	getBittrexCoins() {
		return this.http.get( `${this.BITTREX_URL}` )
			.map( ( response ) => {
				// return this.mapBittrex( response );
			} );
			/*this.store.dispatch( {
				type: EXCHANGES_ACTIONS.EXCHANGES_COINS_LOADED,
				payload: {
					coin: response.json().map( this.toCoin )
				}
			} );*/
	};

/*	mapBittrex( coinData ) {
		console.log( 'BITTREX:  ', coinData.json().result );
		return coinData.json().result.map( ( bittrexCoin ) => {
			return {
				name: bittrexCoin.name,
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
		} );
	}*/

	getCoinValues() {
		return this.http.get( 'https://api.coinmarketcap.com/v1/ticker/' )
			.map( ( data )  =>  {
				return data.json();
			} )
			.map( ( data ) => {
				return data.map( ( coin ) => {
					return {
						name: coin.name,
						symbol: coin.symbol
					};
				} );
			} )
			.do( ( data ) => console.log( data ) );
	}
}

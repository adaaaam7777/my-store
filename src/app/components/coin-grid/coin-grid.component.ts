import { Store } from '@ngrx/store';
import { OnInit, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { IFilter } from '../../reducers/filter.reducer';
import { RealtimeCoinsService } from '../services/coin.service';
import { AppState } from '../../reducers/index';
import { Coin } from '../../interfaces/coin.interface';
import { Http } from '@angular/http';

@Component( {
	selector: 'app-coin-grid',
	templateUrl: './coin-grid.component.html',
	styleUrls: ['./coin-grid.component.css'],
} )
export class CoinGridComponent implements OnInit {

	@Input() coinsPerPage = 20;

	public coins: Observable<Coin[]>;
	public filter: Observable<IFilter>;

	coinsShown = Observable.of( [] );
	allCoins = Observable.of( [] );

	totalCoinsShown = this.coinsPerPage;

	scrollCallback;

	constructor(
		private store: Store<AppState>,
		private coinsService: RealtimeCoinsService,
		private http: Http
	) {
		console.log( 'constructor' );
		this.coins = Observable.combineLatest( store.select( 'coins' ).do( ( x ) => console.log( 'afdsfws', x ) ),
			store.select( 'filter' ).do( ( x ) => console.log( 'aaaaa', x ) ).distinctUntilChanged(), this.applyFilter );
		this.onCoinsChanged();

		this.scrollCallback = this.loadMoarCoins.bind( this );
	}

	applyFilter( coins: Array<Coin>, filter: IFilter ): Array<Coin> {
		console.log( 'init_: ', coins );
		let filteredCoins = coins.filter( x => !filter.name || x.name.toLowerCase().indexOf( filter.name.toLowerCase() ) !== -1 );
		this.allCoins = Observable.of( filteredCoins );
		return filteredCoins;
	}

	ngOnInit(): void {
		console.log( 'init_init' );
		this.coinsService.run();
	}

	onCoinsChanged() {
		console.log( 'onCoinsChanged', this.totalCoinsShown );
		this.coinsShown = this.coins.map( ( items ) => items.slice( 0, this.totalCoinsShown ) );
	}

	loadMoarCoins() {
		this.totalCoinsShown += this.coinsPerPage;
		console.log( 'loadmorecoins', this.totalCoinsShown );
		this.onCoinsChanged();
		return Observable.of( [] ); // so exhaustMap wont halt
	}

	getCoinClass( name: string ): string {
		let newName = name.toLowerCase().replace( ' ', '-' );
		return `s-s-${ newName }`;
	}

}

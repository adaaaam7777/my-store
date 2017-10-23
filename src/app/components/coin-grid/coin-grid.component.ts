import { Store } from '@ngrx/store';
import { OnInit, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { COIN_ACTIONS } from '../../reducers/coins.reducer';
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

	public coins: Observable<Coin[]>;
	public filter: Observable<IFilter>;

	pageNumber = 0;
	itemsPerPage = 10;
	allItemsLength = 0;
	coinsShown = Observable.of( [] );

	constructor(
		private store: Store<AppState>,
		private coinsService: RealtimeCoinsService,
		private http: Http
	) {
		this.coins = Observable.combineLatest( store.select( 'coins' ), store.select( 'filter' ), this.applyFilter );
		this.onItemsPerPageChanged( 10 );
	}

	applyFilter( coins: Array<Coin>, filter: IFilter ): Array<Coin> {
		console.log( 'init: ', coins );
		this.allItemsLength = coins.length;
		let newCoins = coins
			.filter( x => !filter.name || x.name.toLowerCase().indexOf( filter.name.toLowerCase() ) !== -1 );
		this.coinsShown = Observable.of( newCoins.slice( 0, 10 ) );
		return newCoins;
	}

	ngOnInit(): void {
		this.coinsService.run();
	}

	delete( coin ) {
		this.store.dispatch( {
			type: COIN_ACTIONS.DELETE_COIN,
			payload: coin,
		} );
	}

	onPageChanged( newPage: number ) {
		const from = newPage * this.itemsPerPage;
		const to = from + this.itemsPerPage;
		this.coinsShown = this.coins.map( ( items ) => items.slice( from, to ) );
		this.pageNumber = newPage;
	}

	onItemsPerPageChanged( newItemsPerPage: number ) {
		this.itemsPerPage = newItemsPerPage;
		const newPageNumber = this.totalPages < this.pageNumber ? this.totalPages - 1 : this.pageNumber;
		this.onPageChanged( newPageNumber );
	}

	get totalPages(): number {
		return Math.ceil( this.allItemsLength / this.itemsPerPage );
	}

	getCoinClass( name: string ): string {
		let newName = name.toLowerCase().replace( ' ', '-' );
		return `s-s-${ newName }`;
	}

}

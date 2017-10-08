import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';

import {IFilter, FILTER_ACTIONS} from '../../reducers/filter.reducer';
import {Observable} from 'rxjs';

@Component( {
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.css'],
} )
export class FilterComponent implements OnInit {

	public name = new FormControl();
	public rank = new FormControl();
	constructor( private store: Store<any> ) {
		store.select( 'filter' ).subscribe( ( filter: IFilter ) => {
			this.name.setValue( filter.name );
			this.rank.setValue( filter.rank );
		} );
		Observable.merge( this.name.valueChanges, this.rank.valueChanges ).debounceTime( 1000 ).subscribe( () => this.filter() );
	}

	ngOnInit() {
	}

	filter() {
		this.store.dispatch( {
			type: FILTER_ACTIONS.UPDATE_FILTER,
			payload: {
				name: this.name.value,
				rank: this.rank.value,
			}
		} );
	}

	clearFilter() {
		this.store.dispatch( {
			type: FILTER_ACTIONS.CLEAR_FILTER,
		} );
	}

}

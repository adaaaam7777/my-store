import { Store } from '@ngrx/store';
import { OnInit, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { IFreelancer, AppState, FREELANCER_ACTIONS } from '../../reducers/freelancers.reducer';
import { IFilter } from '../../reducers/filter.reducer';
import { RealtimeFreelancersService } from '../services/freelancer.service';

@Component( {
	selector: 'app-freelancer-grid',
	templateUrl: './freelancer-grid.component.html',
	styleUrls: ['./freelancer-grid.component.css'],
} )
export class FreelancerGridComponent implements OnInit {

	public freelancers: Observable<IFreelancer[]>;
	public filter: Observable<IFilter>;

	pageNumber = 0;
	itemsPerPage = 10;
	allItemsLength = 0;
	freelancersShown = Observable.of( [] );

	constructor(
		private store: Store<AppState>,
		private freelancersService: RealtimeFreelancersService
	) {
		this.freelancers = Observable.combineLatest(store.select('freelancers'), store.select('filter'), this.applyFilter);
		this.onItemsPerPageChanged( 10 );
	}

	applyFilter( freelancers: Array<IFreelancer>, filter: IFilter ): Array<IFreelancer> {
		console.log( 'init: ', freelancers );
		this.allItemsLength = freelancers.length;
		let newFreelancers = freelancers
			.filter( x => !filter.name || x.name.toLowerCase().indexOf( filter.name.toLowerCase() ) !== -1 )
			.filter( x => !filter.email || x.email.toLowerCase().indexOf( filter.email.toLowerCase() ) !== -1 );
		this.freelancersShown = Observable.of( newFreelancers.slice( 0, 10 ) );
		return newFreelancers;

	}

	ngOnInit(): void {
		this.freelancersService.run();
	}

	delete( freelancer ) {
		this.store.dispatch( {
			type: FREELANCER_ACTIONS.DELETE_FREELANCER,
			payload: freelancer,
		} );
	}

	onPageChanged( newPage: number ) {
		const from = newPage * this.itemsPerPage;
		const to = from + this.itemsPerPage;
		this.freelancersShown = this.freelancers.map( ( items ) => items.slice( from, to ) );
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

}

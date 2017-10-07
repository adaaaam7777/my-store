import { Store } from '@ngrx/store';
import { OnInit, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { IFreelancer, AppState, FREELANCER_ACTIONS } from '../../reducers/freelancers.reducer';
import { IFilter } from '../../reducers/filter.reducer';
import {RealtimeFreelancersService} from '../services/freelancer.service';

@Component( {
	selector: 'app-freelancer-grid',
	templateUrl: './freelancer-grid.component.html',
	styleUrls: ['./freelancer-grid.component.css'],
} )
export class FreelancerGridComponent implements OnInit {

	public freelancers: Observable<Array<IFreelancer>>;
	public filter: Observable<IFilter>;

	constructor(
		private store: Store<AppState>,
		private freelancersService: RealtimeFreelancersService
	) {
		this.freelancers = Observable.combineLatest( store.select( 'freelancers' ), store.select( 'filter' ), this.applyFilter );
	}

	applyFilter( freelancers: Array<IFreelancer>, filter: IFilter ): Array<IFreelancer> {
		return freelancers
			.filter( x => !filter.name || x.name.toLowerCase().indexOf( filter.name.toLowerCase() ) !== -1 )
			.filter( x => !filter.email || x.email.toLowerCase().indexOf( filter.email.toLowerCase() ) !== -1 );
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

}

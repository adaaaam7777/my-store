import { ActionReducerMap } from '@ngrx/store';

import {filterReducer, IFilter} from './filter.reducer';
import {freelancersReducer, IFreelancer} from './freelancers.reducer';

export interface State {
	filter: IFilter;
	freelancers: Array<IFreelancer>;
}

export const reducers: ActionReducerMap< State > = {
	filter: filterReducer,
	freelancers: freelancersReducer
};

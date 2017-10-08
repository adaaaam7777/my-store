import { ActionReducerMap } from '@ngrx/store';

import { filterReducer, IFilter } from './filter.reducer';
import { coinsReducer, Coin } from './coins.reducer';

export interface State {
	filter: IFilter;
	coins: Array<Coin>;
}

export const reducers: ActionReducerMap< State > = {
	filter: filterReducer,
	coins: coinsReducer
};

import { ActionReducerMap } from '@ngrx/store';

import { filterReducer, IFilter } from './filter.reducer';
import { coinsReducer, Coin } from './coins.reducer';
import { userReducer } from './user.reducer';
import { User } from '../data/user/user.data';

export interface AppState {
	coins: Array<Coin>;
	filter: IFilter;
	user: User;
}

export const reducers: ActionReducerMap< AppState > = {
	filter: filterReducer,
	coins: coinsReducer,
	user: userReducer
};

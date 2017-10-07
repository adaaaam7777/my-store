import { Action } from '@ngrx/store';

export interface IFilter {
	name: string;
	email: string;
}

export const FILTER_ACTIONS = {
	UPDATE_FILTER: 'UPDATE_FILTER',
	CLEAR_FILTER: 'CLEAR_FILTER',
}

export type FilterActions = UpdateFilterAction | ClearFilterAction;

class UpdateFilterAction implements Action {
	readonly type = 'UPDATE_FILTER';

	constructor( public payload: IFilter ) {}
}

class ClearFilterAction implements Action {
	readonly type = 'CLEAR_FILTER';

	constructor( public payload: IFilter ) {}
}

const initialState = { name: '', email: '' };

export function filterReducer( state: IFilter = initialState, action: FilterActions ): IFilter {
	switch ( action.type ) {
		case FILTER_ACTIONS.UPDATE_FILTER:
			// Create a new state from payload
			return Object.assign( {}, action.payload );
		case FILTER_ACTIONS.CLEAR_FILTER:
			// Create a new state from initial state
			return Object.assign( {}, initialState );
		default:
			return state;
	}
}

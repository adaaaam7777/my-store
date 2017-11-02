import { Action } from '@ngrx/store';

import { Coin } from '../interfaces/coin.interface';

export interface ExchangesActionPayload {
	exchangesCoins: Coin[];
}

class ExchangesLoadAction implements Action {
	readonly type = 'EXCHANGES_COINS_LOADED';

	constructor( public payload: ExchangesActionPayload ) {}
}

export const EXCHANGES_ACTIONS = {
	EXCHANGES_COINS_LOADED: 'EXCHANGES_COINS_LOADED'
};

export type ExchangesActions = ExchangesLoadAction;

export function exchangesReducer( state: Array<Coin> = [], action: ExchangesActions ): Array<Coin> {
	console.log( 'action: ', action );
	switch ( action.type ) {
		case EXCHANGES_ACTIONS.EXCHANGES_COINS_LOADED:
			// Return the new state with the payload as coins list
			return action.payload.exchangesCoins.concat( action.payload.exchangesCoins );
		default:
			return state;
	}
}

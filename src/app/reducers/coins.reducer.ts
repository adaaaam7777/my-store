import { Action } from '@ngrx/store';

import { Coin } from '../interfaces/coin.interface';

export interface CoinActionPayload {
	coin: Coin[];
	ADD: Coin;
	DELETE: number[];
}

class IncomingDataAction implements Action {
	readonly type = 'INCOMMING_DATA';

	constructor( public payload: CoinActionPayload, ) {}
}
class CoinLoadAction implements Action {
	readonly type = 'COINS_LOADED';

	constructor( public payload: CoinActionPayload ) {}
}
class CoinDeleteAction implements Action {
	readonly type = 'DELETE_COIN';

	constructor( public payload: CoinActionPayload ) {}
}

export const COIN_ACTIONS = {
	COINS_LOADED: 'COINS_LOADED',
	INCOMMING_DATA: 'INCOMMING_DATA',
	DELETE_COIN: 'DELETE_COIN',
};

export type CoinActions = IncomingDataAction | CoinLoadAction | CoinDeleteAction;

export function coinsReducer( state: Array<Coin> = [], action: CoinActions ): Array<Coin> {
	console.log( 'action: ', action );
	switch ( action.type ) {
		case COIN_ACTIONS.INCOMMING_DATA:
			action.payload.DELETE.forEach( ( index ) => {
				state.splice( state.indexOf( action.payload.coin[ 0 ] ), 1 );
			} );
			return Array.prototype.concat( action.payload.ADD, state );
		case COIN_ACTIONS.COINS_LOADED:
			// Return the new state with the payload as coins list
			return action.payload.coin.concat( action.payload.coin );
		case COIN_ACTIONS.DELETE_COIN:
			// Remove the element from the array
			state.splice( state.indexOf( action.payload.coin[ 0 ] ), 1 );
			// We need to create another reference
			return Array.prototype.concat( state );
		default:
			return state;
	}
}

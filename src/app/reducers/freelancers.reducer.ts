import { Action } from '@ngrx/store';

import {IFilter} from './filter.reducer';

export interface AppState {
	freelancers: Array<IFreelancer>;
	filter: IFilter;
}

export interface IFreelancer {
	name: string;
	email: string;
	thumbnail: string;
}

export interface FreelancerActionPayload {
	freelancer: IFreelancer;
	ADD: IFreelancer;
	DELETE: number[];
}

class IncomingDataAction implements Action {
	readonly type = 'INCOMMING_DATA';

	constructor( public payload: FreelancerActionPayload, ) {}
}
class FreelancerLoadAction implements Action {
	readonly type = 'FREELANCERS_LOADED';

	constructor( public payload: FreelancerActionPayload ) {}
}
class FreelancerDeleteAction implements Action {
	readonly type = 'DELETE_FREELANCER';

	constructor( public payload: FreelancerActionPayload ) {}
}

export const FREELANCER_ACTIONS = {
	FREELANCERS_LOADED: 'FREELANCERS_LOADED',
	INCOMMING_DATA: 'INCOMMING_DATA',
	DELETE_FREELANCER: 'DELETE_FREELANCER',
};

export type FreelancerActions = IncomingDataAction | FreelancerLoadAction | FreelancerDeleteAction;

export function freelancersReducer( state: Array<IFreelancer> = [], action: FreelancerActions ): Array<IFreelancer> {
	console.log( 'sate: ', state );
	console.log( 'action: ', action );
	switch ( action.type ) {
		case FREELANCER_ACTIONS.INCOMMING_DATA:
			action.payload.DELETE.forEach( ( index ) => {
				state.splice( state.indexOf( action.payload.freelancer ), 1 );
			} );
			return Array.prototype.concat( action.payload.ADD, state );
		case FREELANCER_ACTIONS.FREELANCERS_LOADED:
			// Return the new state with the payload as freelancers list
			return Array.prototype.concat( action.payload.freelancer );
		case FREELANCER_ACTIONS.DELETE_FREELANCER:
			// Remove the element from the array
			state.splice( state.indexOf( action.payload.freelancer ), 1 );
			// We need to create another reference
			return Array.prototype.concat( state );
		default:
			return state;
	}
}

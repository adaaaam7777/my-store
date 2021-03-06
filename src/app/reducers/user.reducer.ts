import * as userActions from '../actions/user.actions';
import { User } from '../data/user/user.data';

export type Action = userActions.All;
const defaultUser = new User( null, 'GUEST' );

/// Reducer function
export function userReducer( state: User = defaultUser, action: Action ) {
	console.log( 'user action', action );
	switch ( action.type ) {
		case userActions.GET_USER:
			return { ...state, loading: true };
		case userActions.AUTHENTICATED:
			return { ...state, ...action.payload, loading: false };
		case userActions.NOT_AUTHENTICATED:
			return { ...state, ...defaultUser, loading: false };
		case userActions.GOOGLE_LOGIN:
			return { ...state, loading: true };
		case userActions.AUTH_ERROR:
			return { ...state, ...action.payload, loading: false };
		case userActions.LOGOUT:
			return { ...state, loading: true };
	}
}

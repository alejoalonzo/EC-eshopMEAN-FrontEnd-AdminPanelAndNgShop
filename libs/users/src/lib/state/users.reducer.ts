// import { createReducer, on, Action } from '@ngrx/store';
// import * as UsersActions from './users.actions';
// import { User } from '../models/user';

// export const USERS_FEATURE_KEY = 'users';

// export interface UsersState {
//   user: User | any;
//   isAuthenticated: boolean; 
// }

// export interface UsersPartialState {
//   readonly [USERS_FEATURE_KEY]: UsersState;
// }

// // export const usersAdapter: EntityAdapter<UsersEntity> =
// //   createEntityAdapter<UsersEntity>();

// export const initialUsersState: UsersState = {
//   user: null,
//   isAuthenticated: false
// };

// const userReducer = createReducer(
//   initialUsersState,
//   on(UsersActions.buildUserSession, (state) => ({...state})),
//   on(UsersActions.buildUserSessionSucces, (state, action) => ({
//     ...state, 
//     user: action.user, 
//     isAuthenticated:true
//   })),
//   on(UsersActions.buildUserSessionFail, (state) => ({
//     ...state, user: null, isAuthenticated:false
//   })),

// );

// export function reducer(state: UsersState | undefined, action: Action) {
//   return userReducer(state, action);
// }
 
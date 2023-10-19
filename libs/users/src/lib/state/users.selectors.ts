import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURE_KEY, UsersState, UsersPartialState } from './users.reducer';

// Lookup the 'Users' feature state managed by NgRx
export const getUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);
export const getUsersStatePartial = createFeatureSelector<UsersPartialState>(USERS_FEATURE_KEY);


export const getUser = createSelector(getUsersState, (state: UsersState) => state.user);

export const getUserIsAuth = createSelector(getUsersState, (state: UsersState) => state.isAuthenticated);

export const UsersSelectors = {

  getUser,
  getUserIsAuth,
};
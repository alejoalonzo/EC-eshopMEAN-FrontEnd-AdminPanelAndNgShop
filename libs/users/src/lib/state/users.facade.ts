import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UsersSelectors } from './users.selectors'
import * as UsersActions from './users.actions';

@Injectable()
export class UsersFacade {

  currentUser$ = this.store.pipe(select(UsersSelectors.getUser))   //'$' at the end of variable means observable variable
  isAuthtenticated$ = this.store.pipe(select(UsersSelectors.getUserIsAuth))
  
  constructor(private readonly store: Store) {}

  buildUserSession() {
    this.store.dispatch(UsersActions.buildUserSession());
  }
}

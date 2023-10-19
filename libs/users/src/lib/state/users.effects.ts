import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as UsersActions from './users.actions';
import { LocalStorageServiceService } from '../services/local-storage-service.service';
import { UsersService } from '../services/users.service';
import { catchError, concatMap, map, of } from 'rxjs';

@Injectable()
export class UsersEffects {

  buildUserSession$ = createEffect(()=> this.actions$.pipe(
    ofType(UsersActions.buildUserSession),
    concatMap(()=>{
      if(this.localStorageServise.isVAlidToken()){
        const userId = this.localStorageServise.getUserIdFromToken();
        if(userId){
          return this.userServise.getUser(userId).pipe(
            map((user)=>{
              return UsersActions.buildUserSessionSucces({user:user})
            }),
            catchError(()=> of(UsersActions.buildUserSessionFail({ error: 'Invalid token' })))
          )
        }else{
          return of(UsersActions.buildUserSessionFail({ error: 'Invalid token' }))
        }
      }else{
        return of(UsersActions.buildUserSessionFail({ error: 'Invalid token' }))
      }
    })
  ))

  constructor(
    private readonly actions$: Actions, 
    private localStorageServise: LocalStorageServiceService,
    private userServise: UsersService  
  ) {}
}

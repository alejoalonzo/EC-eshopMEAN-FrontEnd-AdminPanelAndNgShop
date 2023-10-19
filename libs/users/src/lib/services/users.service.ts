import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { User } from '../models/user';
import { environment } from '@env/environment';
import { UsersFacade } from '../state/users.facade';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiURLusers = environment.apiURL+'users';
  public url!: string;

  constructor(private http:HttpClient, private usersFacade: UsersFacade) {
   }

   
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiURLusers);
  }
  getUser(userId: string): Observable<User>{
   return this.http.get<User>(`${this.apiURLusers}/${userId}`);
 }
 
 createUser(userData: User): Observable<User>{
  return this.http.post<User>(this.apiURLusers, userData);
}
  updateUser(userData: User, userId: string): Observable<User>{
    return this.http.put<User>(`${this.apiURLusers}/${userId}`, userData);
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  deleteUser(userId: string): Observable<unknown>{
    return this.http.delete<unknown>(`${this.apiURLusers}/${userId}`);
  }

  initappStore(){
    this.usersFacade.buildUserSession
  }
  
  observCurrentUser(){
    return this.usersFacade.currentUser$
  }

  isCurrentAunth(){
    return this.usersFacade.isAuthtenticated$
  }
}

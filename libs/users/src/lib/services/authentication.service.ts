import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { User } from '../models/user';
import { environment } from '@env/environment';
import { Router } from '@angular/router';
import { LocalStorageServiceService } from './local-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiURLusers = environment.apiURL+'users';
  constructor(
    private http:HttpClient,
    private localStorageToken: LocalStorageServiceService,
    private router: Router,

    ) {}
  login(email: string, password: string): Observable<User>{
    return this.http.post<User>(`${this.apiURLusers}/login`,{email, password});
  }
  logout(){
    this.localStorageToken.removeToken();
    this,this.router.navigate(['/login']);
  }
}


import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  constructor() { console.log() }

  setToken(data: any){
    localStorage.setItem(TOKEN, data)
  }
  getToken():any{
    return localStorage.getItem(TOKEN)
  }
  removeToken(){
    localStorage.removeItem(TOKEN)
  }
  isVAlidToken(){
    const token = this.getToken();
    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      return !this._tokenIsExpired(tokenDecode.exp)
    }else{
      return false
    }
  }

  getUserIdFromToken(){
    const token = this.getToken();
    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if(tokenDecode){
        return tokenDecode.userId
      }else{
        return null
      }
    }else{
      return null
    }
  }
  private _tokenIsExpired(expriration: number): boolean{
    return Math.floor(new Date().getTime() / 1000) >= expriration;
  }
}

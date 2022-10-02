import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Category } from '../models/category';
import { Global } from '../../../../global/global';




@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  public url!: string;
  constructor(private http:HttpClient) { 
    
  }

  getCategories(): Observable<Category[]>{
    
    this.url = Global.url;
    return this.http.get<Category[]>(this.url+'/v1/categories');
    //http://127.0.0.1:3000/api/v1/categories
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Category } from '../models/category';
// import { environment } from '@env/environment';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  apiURLcategories = environment.apiURL+'categories';
  public url!: string;
  constructor(private http:HttpClient) { 
    
  }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.apiURLcategories);
  }
  getCategory(categoryId: string): Observable<Category>{
    return this.http.get<Category>(`${this.apiURLcategories}/${categoryId}`);
  }
  createCategories(category: Category): Observable<Category>{
    // this.url = Global.url;
    return this.http.post<Category>(this.apiURLcategories, category);
  }
  updateCategories(category: Category): Observable<Category>{
    // this.url = Global.url;
    return this.http.put<Category>(`${this.apiURLcategories}/${category['id']}`, category);
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  deleteCategories(categoryId: string): Observable<unknown>{
    // this.url = Global.url;
    // eslint-disable-next-line @typescript-eslint/ban-types
    return this.http.delete<unknown>(`${this.apiURLcategories}/${categoryId}`);
  }
}

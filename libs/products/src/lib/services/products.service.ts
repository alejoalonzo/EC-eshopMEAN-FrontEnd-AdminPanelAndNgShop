import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Product } from '../models/product';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  apiURLproducts = environment.apiURL+'products';
  public url!: string;
  constructor(private http:HttpClient) { 
    
  }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiURLproducts);
  }
  createProduct(productData: FormData): Observable<Product>{
    return this.http.post<Product>(this.apiURLproducts, productData);
  }
  getProduct(productId: string): Observable<Product>{
    return this.http.get<Product>(`${this.apiURLproducts}/${productId}`);
  }
  updateProduct(productData: FormData, productId: string): Observable<Product>{
    return this.http.put<Product>(`${this.apiURLproducts}/${productId}`, productData);
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  deleteProduct(productId: string): Observable<unknown>{
    // eslint-disable-next-line @typescript-eslint/ban-types
    return this.http.delete<unknown>(`${this.apiURLproducts}/${productId}`);
  }
}

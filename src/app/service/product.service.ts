import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:3000/product';
  constructor(private http : HttpClient) { }

  getAll(){
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProductById(id : number){
    return this.http.get<Product>(this.baseUrl+'/'+id);
  }

  createProduct(_data : Product){
    return this.http.post(this.baseUrl,_data);
  }

  updateProduct(_data : Product){
    return this.http.put(this.baseUrl+'/'+_data.id,_data);
  }

  deleteProductById(id : number){
    return this.http.delete(this.baseUrl+'/'+id);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

	private baseUrl = 'http://localhost:8080';
  constructor(private httpClient : HttpClient) { }

  getProducts() {
	return this.httpClient.get(`${this.baseUrl}/products`);
}

}

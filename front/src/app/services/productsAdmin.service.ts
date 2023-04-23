import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'app/model/product';

@Injectable({
	providedIn: 'root'
})
export class ProductsService {

	private baseUrl = 'http://localhost:8080';

	constructor(private httpClient: HttpClient) { }

	getProducts() {
		return this.httpClient.get(`${this.baseUrl}/products`);
	}

	saveProduct(product: Product) {
		return this.httpClient.post<Product>(`${this.baseUrl}/products`, product);
	}

	editProduct(productId, updateProduct) {
		return this.httpClient.patch(`${this.baseUrl}/products/${productId}`, updateProduct);
	}

	deleteProducts(productsIds: String[]) {
		return this.httpClient.delete(`${this.baseUrl}/products`, { body: productsIds });
	}

}

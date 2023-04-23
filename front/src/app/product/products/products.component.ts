import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from 'app/model/product';
import { ProductsService } from 'app/services/products.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productsFromServer: Product[] = [];
  products: Product[] = [];
  layout: string = 'grid';
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;

  constructor(private poductsService: ProductsService) { }

  ngOnInit(): void {
    this.poductsService.getProducts().subscribe((data: Product[]) => {
      this.productsFromServer = data
      this.products = data
    });
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];
  }
  onSortChange(event) {
    let value = event.value;
    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
  onSearchChange($event) {
    this.products = [...this.productsFromServer.filter(p => p.name.includes($event.target.value) || p.category.includes($event.target.value))];
  }

  getSeverity(product) {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
    }
  };

}

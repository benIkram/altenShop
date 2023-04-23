import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'app/model/product';
import { ProductsService } from 'app/services/productsAdmin.service';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss'],
})
export class ProductsAdminComponent implements OnInit {
  products: Product[] = [];
  product: Product;
  clonedProducts: { [s: string]: Product } = {};
  selectedProducts: Product[];
  image: File;
  isNewProductSubmited?: boolean;

  @ViewChild('dt1') dataTable!: Table;

  constructor(private poductsService: ProductsService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.poductsService.getProducts().subscribe((data: Product[]) =>
      this.products = data
    );
  }

  onRowEditInit(product: Product) {
    this.clonedProducts[product.id] = { ...product };

  }

  onSubmitProduct(product: Product) {
    const isFormValid = this.isFormValid(product)
    if (!isFormValid) {
      return
    }
    !product.id ? this.saveNewProduct(product) : this.updateProduct(product);
  }

  onRowEditCancel(product: Product, index: number) {
    if (!product.id) {
      this.dataTable.value.shift();
    } else {
      this.products[index] = this.clonedProducts[product.id];
      delete this.clonedProducts[product.id];
    }
  }



  applyFilter($event: any, field: string, matchMode: string) {
    const value = ($event.target as HTMLInputElement)?.value;
    this.dataTable.filter(value, field, matchMode);
  }

  addNewProduct() {
    if (this.isNewProductSubmited === false) {
      return
    }
    const product = new Product();
    this.dataTable.value.unshift(product)
    this.dataTable.initRowEdit(product)
    this.isNewProductSubmited = false;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        const productsIds = this.selectedProducts.map(p => p.id);
        this.poductsService.deleteProducts(productsIds).subscribe(
          () => {
            this.products = this.products.filter((product) => !this.selectedProducts.includes(product));
            this.selectedProducts = null;
          },
        );
      }
    });
  }


  isFormValid(product: Product) {
    return product.code && product.name && product.description && product.price !== undefined && product.category && product.quantity !== undefined && product.inventoryStatus;
  }

  saveNewProduct(product: Product) {
    this.poductsService.saveProduct(product).subscribe(
      (product) => {
        const cloneProducts = [...this.products];
        cloneProducts.shift()
        this.products = [product, ...cloneProducts];
        this.isNewProductSubmited = true;
      }
    );
  }

  updateProduct(product: Product) {
    this.poductsService.editProduct(product.id, product).subscribe(
      () => {
        delete this.clonedProducts[product.id];
      }
    );
  }
}

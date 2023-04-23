import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductsAdminComponent } from './products-admin/products-admin.component';
import { ProductsComponent } from './products/products.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { ConfirmationService, MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    ProductsAdminComponent,
    ProductsComponent,

  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    FormsModule,

  ],
  exports: [
    ProductsAdminComponent,
    ProductsComponent
  ],
})
export class ProductModule { }

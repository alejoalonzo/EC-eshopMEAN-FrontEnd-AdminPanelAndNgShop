import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ProductsSearchComponent } from './Components/products-search/products-search.component';
import { CategoriesBannerComponent } from './Components/categories-banner/categories-banner.component';
import { FeaturedProductsComponent } from './Components/featured-products/featured-products.component';
import { ProductItemComponent } from './Components/product-item/product-item.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ProductsListComponent } from './Components/pages/products-list/products-list.component';
import { FormsModule } from '@angular/forms';

export const productsRoutes: Route[] = [
  { path: 'products', component: ProductsListComponent },
  { path: 'category/:categoryid', component: ProductsListComponent }
];


@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(productsRoutes), 
    ButtonModule, 
    CheckboxModule,
    FormsModule
  ],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductItemComponent,
    ProductsListComponent,
  ],
  exports: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductItemComponent,
    ProductsListComponent
  ],
})
export class ProductsModule {}

import { NgModule } from '@angular/core';
import { AuthGardService } from '@bluebits/users';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    //this gard blocks the following urls so that no one can see them, they are unlocked with the login
    canActivate:[AuthGardService],
    children: [
      {
        path: '',// home
        component: DashboardComponent,
      },
      //categories-------------------------------
      {
        path: 'categories',
        component: CategoriesListComponent,
      },
      {
        path: 'categories/form',
        component: CategoriesFormComponent,
      },
      {
        path: 'categories/form/:id',
        component: CategoriesFormComponent,
      },
      //products-------------------------------
      {
        path: 'products',
        component: ProductsListComponent,
      },
      {
        path: 'products/form',
        component: ProductsFormComponent,
      },
      {
        path: 'products/form/:id',
        component: ProductsFormComponent,
      },
      //users-------------------------------
      {
        path: 'users',
        component: UsersListComponent,
      },
      {
        path: 'users/form',
        component: UsersFormComponent,
      },
      {
        path: 'users/form/:id',
        component: UsersFormComponent,
      },

      //orders-------------------------------
      {
        path: 'orders',
        component: OrdersListComponent,
      },
      {
        path: 'orders/:id',
        component: OrdersDetailComponent,
      },
    ],
  },
  // {//redirrection for every url if is not above
  //   path:'**',
  //   redirectTo: '',
  //   pathMatch: 'full'
  // }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })
    ],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class AppRoutingModuleModule { }

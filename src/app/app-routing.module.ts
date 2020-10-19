import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerSaveComponent } from './components/customer-save/customer-save.component';
import { HomeComponent } from './components/home/home.component';
import { PaymentMethodEditComponent } from './components/payment-method-edit/payment-method-edit.component';
import { PaymentMethodListComponent } from './components/payment-method-list/payment-method-list.component';
import { PaymentMethodSaveComponent } from './components/payment-method-save/payment-method-save.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductSaveComponent } from './components/product-save/product-save.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'customer-list', component: CustomerListComponent },
  { path: 'customer-save', component: CustomerSaveComponent },
  { path: 'customer-edit/:email', component: CustomerEditComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-save', component: ProductSaveComponent },
  { path: 'product-edit/:proId', component: ProductEditComponent },
  { path: 'paymentMethod-list', component: PaymentMethodListComponent },
  { path: 'paymentMethod-save', component: PaymentMethodSaveComponent },
  { path: 'paymentMethod-edit/:payId', component: PaymentMethodEditComponent },
  { path:'',pathMatch:'full',redirectTo:'home' },
  { path:'**',pathMatch:'full',redirectTo:'home'},
  { path:'#',pathMatch:'full',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

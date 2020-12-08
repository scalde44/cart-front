import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ComprasComponent } from './components/compras/compras.component';
import { CustomerCartComponent } from './components/customer-cart/customer-cart.component';
import { CustomerComprasComponent } from './components/customer-compras/customer-compras.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerSaveComponent } from './components/customer-save/customer-save.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { EditarComponent } from './components/editar/editar.component';
import { EmailComponent } from './components/email/email.component';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PasswordComponent } from './components/password/password.component';
import { PaymentMethodEditComponent } from './components/payment-method-edit/payment-method-edit.component';
import { PaymentMethodListComponent } from './components/payment-method-list/payment-method-list.component';
import { PaymentMethodSaveComponent } from './components/payment-method-save/payment-method-save.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductSaveComponent } from './components/product-save/product-save.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'home-user', component: HomeUserComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoggedGuard] },
  { path: 'password', component: PasswordComponent, canActivate: [LoggedGuard] },
  { path: 'email', component: EmailComponent, canActivate: [LoggedGuard] },
  { path: 'customer-list', component: CustomerListComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'customer-save', component: CustomerSaveComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'customer-edit/:email', component: CustomerEditComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'customer-compras/:email', component: CustomerComprasComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'customer-cart', component: CustomerCartComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'product-save', component: ProductSaveComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'product-edit/:proId', component: ProductEditComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'paymentMethod-list', component: PaymentMethodListComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'paymentMethod-save', component: PaymentMethodSaveComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'paymentMethod-edit/:payId', component: PaymentMethodEditComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'compras', component: ComprasComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'detalles/:carId/:email', component: DetallesComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'editar', component: EditarComponent, canActivate: [AuthGuard, UserGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
  { path: '#', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { ProductListComponent } from './components/product-list/product-list.component';
import { PaymentMethodListComponent } from './components/payment-method-list/payment-method-list.component';

import { NgFallimgModule } from 'ng-fallimg';
import { FormsModule } from '@angular/forms';
import { CustomerSaveComponent } from './components/customer-save/customer-save.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductSaveComponent } from './components/product-save/product-save.component';
import { PaymentMethodEditComponent } from './components/payment-method-edit/payment-method-edit.component';
import { PaymentMethodSaveComponent } from './components/payment-method-save/payment-method-save.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './components/register/register.component';
import { EmailComponent } from './components/email/email.component';
import { CustomerComprasComponent } from './components/customer-compras/customer-compras.component';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { CustomerCartComponent } from './components/customer-cart/customer-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ComprasComponent } from './components/compras/compras.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { EditarComponent } from './components/editar/editar.component';
import { PasswordComponent } from './components/password/password.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    NavbarComponent,
    ProductListComponent,
    PaymentMethodListComponent,
    CustomerSaveComponent,
    CustomerEditComponent,
    ProductEditComponent,
    ProductSaveComponent,
    PaymentMethodEditComponent,
    PaymentMethodSaveComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    EmailComponent,
    CustomerComprasComponent,
    HomeUserComponent,
    CustomerCartComponent,
    CheckoutComponent,
    ComprasComponent,
    DetallesComponent,
    EditarComponent,
    PasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    NgFallimgModule.forRoot({
      default: 'assets/img/noimage.png'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

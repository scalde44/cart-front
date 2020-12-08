import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCart } from 'src/app/domain/shoppingCart';
import { ShoppingProduct } from 'src/app/domain/shoppingProduct';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import Swal from 'sweetalert2';
import { Subject, Subscription } from 'rxjs';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';

@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css']
})
export class CustomerCartComponent implements OnInit, OnDestroy {
  public shca: ShoppingCart[];
  public shpr: ShoppingProduct[];
  pageActual: number = 1;
  public clienteFireSubscription: Subscription = new Subscription;
  public cartSubscription: Subscription = new Subscription;
  public cart2Subscription: Subscription = new Subscription;
  public removeProSubscription: Subscription = new Subscription;
  public clearCartSubscription: Subscription = new Subscription;
  constructor(private router: Router, private cartService: CartService, private productService: ProductService, private authFirebaseService: AuthFirebaseService,) {
  }
  ngOnDestroy(): void {
    this.clienteFireSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
    this.cart2Subscription.unsubscribe();
    this.removeProSubscription.unsubscribe();
    this.clearCartSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.mirarShca();
    NavbarComponent.showC = false;
  }

  async mirarShca() {
    this.clienteFireSubscription =
      this.authFirebaseService.afAuth.user.subscribe(
        data => {
          if (data) {
            this.cartSubscription =
              this.cartService.findShcaByPayIdNull(data.email).subscribe(
                data => {
                  this.shca = data;
                  this.cart2Subscription =
                    this.cartService.findShprByCarId(this.shca[0].carId).subscribe(
                      data => {
                        this.shpr = data;
                      }, error => {
                        console.error(error);
                      }
                    );
                }
              );
          }
        }
      );
  }

  async deletePro(proId: string, proName: string, proCantidad: number) {
    this.removeProSubscription =
      this.cartService.removeProduct(this.shca[0].carId, proId).subscribe(
        data => {
          Swal.fire(
            'Producto eliminado',
            proCantidad + ' ' + proName,
            'error'
          );
          this.mirarShca();
          NavbarComponent.prueba.next(true);
        }, error => {
          console.error(error);
        }
      );
  }

  async clearCart() {
    this.clearCartSubscription =
      this.cartService.clearCart(this.shca[0].carId).subscribe(
        data => {
          Swal.fire(
            'Clear Cart',
            '',
            'success'
          );
          this.mirarShca();
          NavbarComponent.prueba.next(true);
        }, error => {
          console.error(error);
        }
      );
  }


}

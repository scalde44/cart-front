import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { ShoppingCart } from 'src/app/domain/shoppingCart';
import { ShoppingProduct } from 'src/app/domain/shoppingProduct';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public userF$: Observable<any> = this.authFirebaseService.afAuth.user;
  public shca: ShoppingCart[];
  public shpr: ShoppingProduct[];
  public em: string;
  public static showC: boolean = true;
  public static prueba: Subject<boolean> = new Subject();
  public clienteFireSubscription: Subscription = new Subscription;
  public cartSubscription: Subscription = new Subscription;
  public cart2Subscription: Subscription = new Subscription;
  public cart3Subscription: Subscription = new Subscription;
  public removePubscription: Subscription = new Subscription;
  public cleareCSubscription: Subscription = new Subscription;
  constructor(private authFirebaseService: AuthFirebaseService, private router: Router, private cartService: CartService, private productService: ProductService) {
    (NavbarComponent.prueba.subscribe(res => {
      this.llenar();
    }));

  }
  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.cart3Subscription =
        (this.cartService.carId.subscribe(data => {
          if (data) {
            this.shca = data;
          }
        }));
    }
  }


  public llenar(): void {
    this.clienteFireSubscription =
      this.authFirebaseService.afAuth.user.subscribe(
        data => {
          this.em = data.email;
          this.cartService.findShcaByPayIdNull(this.em).subscribe(
            data => {
              this.shca = data;
            }
          );
        }
      );
  }
  async logout() {
    try {
      await this.authFirebaseService.logoutFirebase();
      localStorage.clear();
    } catch (error) {
      this.router.navigate(['/home']);
    }
  }

  public isAuth(): boolean {
    return !!localStorage.getItem('usuario');
  }

  public isAdmin(): boolean {
    if (localStorage.getItem('rol') == 'A') {
      return true;
    } else {
      return false;
    }
  }

  public show(): boolean {
    return NavbarComponent.showC;
  }

  public editar(): void {
    console.log("editar");
  }

  async mostrarP() {
    this.cart2Subscription =
      this.cartService.findShprByCarId(this.shca[0].carId).subscribe(
        data => {
          this.shpr = data;
        }, error => {
        }
      );
  }

  async deletePro(proId: string) {
    this.removePubscription =
      this.cartService.removeProduct(this.shca[0].carId, proId).subscribe(
        data => {
          console.log("Eliminado");
          NavbarComponent.prueba.next(true);
        }, error => {
        }
      );
  }

  async clearCart() {
    this.cleareCSubscription =
      this.cartService.clearCart(this.shca[0].carId).subscribe(
        data => {
          console.log("Carrito limpiado");
          NavbarComponent.prueba.next(true);
        }, error => {
        }
      );
  }
}

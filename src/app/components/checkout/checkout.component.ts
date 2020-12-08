import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Email } from 'src/app/domain/email';
import { FinalizarCompra } from 'src/app/domain/finalizarCompra';
import { ShoppingCart } from 'src/app/domain/shoppingCart';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public shca: ShoppingCart[];
  public finCom: FinalizarCompra = new FinalizarCompra(0, 0);
  public em: string;
  public emai: Email;
  public showMsg: boolean = false;
  public messages: string[] = [""];
  public username: string = "";
  public cardNumber: number;
  public cvv: number;
  public payId: number = 0;
  constructor(private cartService: CartService, private authFirebaseService: AuthFirebaseService, private router: Router) {

  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.mirarShca();
    NavbarComponent.showC = false;
  }

  async mirarShca() {
      this.authFirebaseService.afAuth.user.subscribe(
        data => {
          if (data) {
            this.em = data.email;
            this.cartService.findShcaByPayIdNull(this.em).subscribe(
              data => {
                this.shca = data;
              }
            );
          }
        }
      );
  }

  public finalizar(): void {
    this.messages = [""];
    if (this.cardNumber == null || this.cvv == null) {
      this.showMsg = true;
      this.messages = ["Verifique sus datos"];
    } else {
      if (this.cardNumber.toString().length == 16 && this.cardNumber.toString().includes("-") == false && this.cardNumber.toString() != null) {
        if (this.username.length > 0) {
          if (this.cvv.toString().length == 3 && this.cvv.toString().includes("-") == false && this.cvv.toString() != null) {
            this.finCom = new FinalizarCompra(this.shca[0].carId, this.payId);
              this.cartService.finalizarCompra(this.finCom).subscribe(
                data => {
                  Swal.fire(
                    'Compra finalizada',
                    'Total: ' + this.shca[0].total,
                    'success'
                  );
                  this.emai = new Email(this.em);
                    this.cartService.createCart(this.emai).subscribe(
                      data => {
                        this.router.navigate(['/home-user']);
                        NavbarComponent.prueba.next(true);
                      }
                    );
                }, err => {
                  this.showMsg = true;
                  this.messages = err.error.error;
                }
              );
          } else {
            this.showMsg = true;
            this.messages = ["Verifique su cvv"];
          }
        } else {
          this.showMsg = true;
          this.messages = ["Verifique su nombre"];
        }
      } else {
        this.showMsg = true;
        this.messages = ["La tarjeta de credito no es válida"];
      }
    }

  }

  public comprobarPayId(): void {
    if (this.cardNumber != null) {
      if (this.cardNumber.toString().charAt(0) == "5") {
        this.payId = 2;
      } else if (this.cardNumber.toString().charAt(0) == "4") {
        this.payId = 1;
      } else if (this.cardNumber.toString().charAt(0) == "3") {
        this.payId = 3;
      } else {
        this.payId = 4;
      }
    } else {
      this.payId = 0;
    }
  }
}

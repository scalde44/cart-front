import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/domain/customer';
import { Email } from 'src/app/domain/email';
import { ShoppingCart } from 'src/app/domain/shoppingCart';
import { User } from 'src/app/domain/user';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public shoppingCarts: ShoppingCart[] = [];
  public user: User;
  public em: Email = new Email("");
  public ema: string = "";
  public pass: string = "";
  public customer: Customer;
  public showMsg: boolean = false;
  public messages: string[] = [""];
  public crear: boolean = true;
  public clientesSubscription: Subscription = new Subscription;
  public customerSubscription: Subscription = new Subscription;
  public shcaSubscription: Subscription = new Subscription;
  public shca2Subscription: Subscription = new Subscription;
  constructor(private router: Router, private authService: AuthService, private authFirebaseService: AuthFirebaseService, public customerService: CustomerService, public cartService: CartService) { }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.user = new User("", "");
  }

  public ingresar(): void {
    this.authFirebaseService.loginFirebase(this.ema, this.pass).then(
      resp => {
        if (resp) {
          this.user.username = "admin";
          this.user.password = "password";
          this.clientesSubscription =
            this.authService.loginUser(this.user).subscribe(
              data => {
                if (resp.user.emailVerified) {
                  localStorage.setItem("usuario", JSON.stringify(this.user));
                  localStorage.setItem("token", data.token);
                  this.customerSubscription =
                    this.customerService.findById(this.ema).subscribe(data => {
                      this.customer = data;
                      if (this.customer.enable == "Y") {
                        localStorage.setItem("rol", this.customer.role);
                        localStorage.setItem("email", this.customer.email);
                        if (this.customer.role == "A") {
                          this.router.navigate(['/home']);
                        } else {
                          this.shcaSubscription =
                            this.cartService.findShcaByPayIdNull(this.customer.email).subscribe(data => {
                              this.shoppingCarts = data;
                              this.em.email = this.customer.email;
                              if (this.shoppingCarts == null) {
                                this.shca2Subscription =
                                  this.cartService.createCart(this.em).subscribe(
                                    data => {
                                      if (data) {
                                        console.table("Nuevo: ", data);
                                      }
                                    }, error => {
                                      console.log(error);
                                    }
                                  );
                                NavbarComponent.prueba.next(true);
                                NavbarComponent.showC==true;
                                this.router.navigate(['/home-user']);
                              } else {
                                NavbarComponent.prueba.next(true);
                                NavbarComponent.showC==true;
                                this.router.navigate(['/home-user']);
                              }
                            }, error => {
                              console.error(error);
                            });

                        }
                      } else {
                        this.showMsg = true;
                        this.messages[0] = "Usuario inhabilitado";
                        localStorage.clear();
                      }
                    }, error => {
                      this.showMsg = true;
                      this.messages[0] = "Usuario no encontrado";
                      localStorage.clear();
                    });
                } else {
                  this.router.navigate(['/email']);
                }

              }, err => {
                this.showMsg = true;
                this.messages[0] = "Usuario o clave no es válido";
              });
        }

      }
    ).catch((error) => {
      this.showMsg = true;
      this.messages[0] = error.message;
    });

  }


}

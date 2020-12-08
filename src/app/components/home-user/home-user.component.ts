import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddShpr } from 'src/app/domain/addShpr';
import { Product } from 'src/app/domain/product';
import { ShoppingCart } from 'src/app/domain/shoppingCart';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import Swal from 'sweetalert2';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit, OnDestroy {

  public products: Product[];
  public shca: ShoppingCart[];
  public addShpr: AddShpr = new AddShpr(0, "", 0);
  public cantidad: number;
  public like: string = '';
  public productSubscription: Subscription = new Subscription;
  public clienteFireSubscription: Subscription = new Subscription;
  public addPSubscription: Subscription = new Subscription;
  constructor(public productService: ProductService, private cartService: CartService, private authFirebaseService: AuthFirebaseService,) { }
  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
    this.addPSubscription.unsubscribe();
    this.clienteFireSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.findAll();
    this.findShca();
    NavbarComponent.showC = true;
  }
  findAll() {
    this.productSubscription = this.productService.findAll()
      .subscribe(data => {
        this.products = data;
      }, error => {
        console.error(error);
      });
  }
  findShca(): void {
    this.clienteFireSubscription = this.authFirebaseService.afAuth.user.subscribe(
      data => {
        if (data) {
          this.cartService.findShcaByPayIdNull(data.email).subscribe(
            data => {
              if (data) {
                this.shca = data;
              }

            }
          );
        }
      }
    );

  }
  agregarP(proId: string, proName: string): void {
    this.addShpr = new AddShpr(this.shca[0].carId, proId, this.cantidad);
    this.addPSubscription = this.cartService.addProduct(this.addShpr).subscribe(
      data => {
        Swal.fire(
          'Producto agregado',
          this.cantidad + ' ' + proName,
          'success'
        );
        NavbarComponent.prueba.next(true);
        this.cantidad = 0;
      }, error => {
        console.log(error);
      }
    );
  }

  busqueda(): void {
    if (this.like === null || this.like === '') {
      this.findAll();
      this.findShca();
    } else {
      this.productService.findByLikeName(this.like).subscribe(data => {
        this.products = data;
      }, error => {
        console.log(error);
      });
    }
  }
}

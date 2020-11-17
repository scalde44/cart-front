import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCart } from 'src/app/domain/shoppingCart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-customer-compras',
  templateUrl: './customer-compras.component.html',
  styleUrls: ['./customer-compras.component.css']
})
export class CustomerComprasComponent implements OnInit {
  public shoppingCarts: ShoppingCart[];
  public email: string;
  pageActual: number = 1;
  constructor(public cartService: CartService,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let params = this.activatedRoute.params['_value'];
    this.email = params.email;
    this.findShcaByEmail();
  }

  public findShcaByEmail(): void {
    this.cartService.findShcaByEmail(this.email).subscribe(
      data => {
        this.shoppingCarts = data;
      }, error => {
        console.log(error);
      }
    );
  }
}

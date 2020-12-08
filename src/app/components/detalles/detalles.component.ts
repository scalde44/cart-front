import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingProduct } from 'src/app/domain/shoppingProduct';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  public shpr: ShoppingProduct[];
  pageActual: number = 1;
  public email: string;
  public carId: number;
  constructor(public cartService: CartService,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let params = this.activatedRoute.params['_value'];
    this.carId = params.carId;
    this.email = params.email;
    this.findShprByCarId();
  }

  public findShprByCarId(): void {
    this.cartService.findShprByCarId(this.carId).subscribe(
      data => {
        this.shpr = data;
      }
    );
  }
}

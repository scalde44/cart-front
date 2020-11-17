import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/domain/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  public products: Product[];

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.findAll();
  }
  findAll(): void {
    this.productService.findAll()
      .subscribe(data => {
        this.products = data;
      }, error => {
        console.error(error);
      });
  }

}

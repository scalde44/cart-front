import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/domain/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public titulo: string = 'Lista de productos';
  public products: Product[];
  public showMsg: boolean = false;
  public messages: string[] = [""];
  pageActual: number = 1;
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
  public delete(proId: string): void {
    this.messages = [];
    this.productService.delete(proId).subscribe(
      ok => {
        this.showMsg = true;
        this.messages[0] = "El product se elimino con éxito";
        this.findAll();
      },
      err => {
        this.showMsg = true;
        this.messages = err.error.error;
      }
    );
  }
}

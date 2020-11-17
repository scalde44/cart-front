import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enable } from 'src/app/domain/enable';
import { Product } from 'src/app/domain/product';
import { EnableService } from 'src/app/services/enable.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  public proId:string;
  public product:Product;
  public enables: Enable[];

  public showMsg: boolean = false;
  public messages: string[] = [""];

  constructor(public router:Router,
    public activatedRoute: ActivatedRoute,
    public productService: ProductService,
    public enableService: EnableService) { }

  ngOnInit(): void {
    let params = this.activatedRoute.params['_value'];
    this.proId = params.proId;
    this.findAllEnable();
    this.findById();
  }

  public findAllEnable(): void {
    this.enables = this.enableService.findAll();
  }

  public findById(): void {
    this.productService.findById(this.proId).subscribe(
      data => {
        this.product = data;
      }
    );
  }
  
  public update(): void {
    this.messages = [""];
    this.productService.update(this.product).subscribe(
      ok => {
        this.showMsg = true;
        this.messages[0] = "El product se actualizo con éxito";},
      err => {
        this.showMsg = true;
        this.messages = err.error.error;
      }
    );
  }
  public delete(): void {
    this.messages = [""];
    this.productService.delete(this.product.proId).subscribe(
      ok => {
        this.showMsg = true;
        this.messages[0] = "El product se elimino con éxito";},
      err => {
        this.showMsg = true;
        this.messages = err.error.error;
      }
    );
  }

}

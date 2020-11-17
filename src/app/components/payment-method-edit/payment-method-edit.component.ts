
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enable } from 'src/app/domain/enable';
import { PaymentMethod } from 'src/app/domain/paymentMethod';
import { EnableService } from 'src/app/services/enable.service';
import { PaymentMehtodService } from 'src/app/services/payment-mehtod.service';

@Component({
  selector: 'app-payment-method-edit',
  templateUrl: './payment-method-edit.component.html',
  styleUrls: ['./payment-method-edit.component.css']
})
export class PaymentMethodEditComponent implements OnInit {

  public payId:number;
  public paymentMethod:PaymentMethod;
  
  public enables: Enable[];

  public showMsg: boolean = false;
  public messages: string[] = [""];

  constructor(public router:Router,
    public activatedRoute: ActivatedRoute,
    public paymentMethodService: PaymentMehtodService,
    public enableService: EnableService) { }

  ngOnInit(): void {
    let params = this.activatedRoute.params['_value'];
    this.payId = params.payId;
    this.findById();
    this.findAllEnable();
  }

  public findAllEnable(): void {
    this.enables = this.enableService.findAll();
  }
  public findById():void{
    this.paymentMethodService.findById(this.payId).subscribe(
      data => {
        this.paymentMethod = data;
        console.table(this.paymentMethod);
      }
    );
  }

  public update(): void {
    this.messages = [""];
    this.paymentMethodService.update(this.paymentMethod).subscribe(
      ok => {
        this.showMsg = true;
        this.messages[0] = "El paymentMethod se actualizo con éxito";},
      err => {
        this.showMsg = true;
        this.messages = err.error.error;
      }
    );
  }
  public delete(): void {
    this.messages = [""];
    this.paymentMethodService.delete(this.paymentMethod.payId).subscribe(
      ok => {
        this.showMsg = true;
        this.messages[0] = "El paymentMethod se elimino con éxito";},
      err => {
        this.showMsg = true;
        this.messages = err.error.error;
      }
    );
  }

}

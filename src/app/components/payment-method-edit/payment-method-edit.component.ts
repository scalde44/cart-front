
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentMethod } from 'src/app/domain/paymentMethod';
import { PaymentMehtodService } from 'src/app/services/payment-mehtod.service';

@Component({
  selector: 'app-payment-method-edit',
  templateUrl: './payment-method-edit.component.html',
  styleUrls: ['./payment-method-edit.component.css']
})
export class PaymentMethodEditComponent implements OnInit {

  public payId:number;
  public paymentMethod:PaymentMethod;

  constructor(public router:Router,
    public activatedRoute: ActivatedRoute,
    public paymentMethodService: PaymentMehtodService) { }

  ngOnInit(): void {
    let params = this.activatedRoute.params['_value'];
    this.payId = params.payId;
    this.findById();
  }

  public findById():void{
    this.paymentMethodService.findById(this.payId).subscribe(
      data => {
        this.paymentMethod = data;
        console.table(this.paymentMethod);
      }
    );
  }

}

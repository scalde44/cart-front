import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from 'src/app/domain/paymentMethod';
import { PaymentMehtodService } from 'src/app/services/payment-mehtod.service';

@Component({
  selector: 'app-payment-method-list',
  templateUrl: './payment-method-list.component.html',
  styleUrls: ['./payment-method-list.component.css']
})
export class PaymentMethodListComponent implements OnInit {

  public titulo: string = 'Lista de metodos de pago';
  public paymentMethods: PaymentMethod[];
  public showMsg: boolean = false;
  public messages: string[] = [""];
  pageActual: number = 1;

  constructor(public paymentMethodService: PaymentMehtodService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.paymentMethodService.findAll()
      .subscribe(data => {
        this.paymentMethods = data;
      }, error => {
        console.error(error);
      });
  }
  public delete(payId: number): void {
    this.messages = [];
    this.paymentMethodService.delete(payId).subscribe(
      ok => {
        this.showMsg = true;
        this.messages[0] = "El paymentMehtod se elimino con éxito";
        this.findAll();
      },
      err => {
        this.showMsg = true;
        this.messages = err.error.error;
      }
    );
  }
}

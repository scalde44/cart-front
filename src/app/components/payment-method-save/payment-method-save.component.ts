import { Component, OnInit } from '@angular/core';
import { Enable } from 'src/app/domain/enable';
import { PaymentMethodOpt } from 'src/app/domain/paymentMethodOpt';
import { EnableService } from 'src/app/services/enable.service';
import { PaymentMehtodService } from 'src/app/services/payment-mehtod.service';

@Component({
  selector: 'app-payment-method-save',
  templateUrl: './payment-method-save.component.html',
  styleUrls: ['./payment-method-save.component.css']
})
export class PaymentMethodSaveComponent implements OnInit {

  public paymentMethodOpt: PaymentMethodOpt;
  public enables: Enable[];

  public showMsg: boolean = false;
  public messages: string[] = [""];
  constructor(public paymentMethodService: PaymentMehtodService, public enableService: EnableService) { }

  ngOnInit(): void {
    this.paymentMethodOpt = new PaymentMethodOpt("Y", "");
    this.findAllEnable();
  }

  public findAllEnable(): void {
    this.enables = this.enableService.findAll();
  }

  public save(): void {
    this.messages = [""];
    this.paymentMethodService.save(this.paymentMethodOpt).subscribe(
      ok => {
        this.showMsg = true;
        this.messages[0] = "El paymentMethod con id "+ ok.payId+" se guardo correctamente";
        this.paymentMethodOpt = new PaymentMethodOpt("Y", "");
      },
      err => {
        this.showMsg = true;
        this.messages = err.error.error;
      }
    )
  }

}

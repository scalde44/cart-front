import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/domain/customer';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  public titulo: string = 'Lista de clientes';
  public customers: Customer[];
  public userF: any;

  public showMsg: boolean = false;
  public messages: string[] = [""];
  pageActual: number = 1;
  constructor(public customerService: CustomerService, private authFirebaseService: AuthFirebaseService) { }

  async ngOnInit() {
    this.findAll();
    this.userF = await this.authFirebaseService.getCurrentUser();
  }

  findAll(): void {
    this.customerService.findAll()
      .subscribe(data => {
        this.customers = data;
      }, error => {
        console.error(error);
      });
  }
  public delete(email: string): void {
    this.messages = [];
    this.customerService.delete(email).subscribe(
      ok => {
        this.showMsg = true;
        this.messages[0] = "El customer se elimino con éxito";
        this.findAll();
      },
      err => {
        this.showMsg = true;
        this.messages = err.error.error;
      }
    );
  }

}

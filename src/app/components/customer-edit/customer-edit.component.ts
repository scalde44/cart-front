import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/domain/customer';
import { Enable } from 'src/app/domain/enable';
import { Role } from 'src/app/domain/role';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { CustomerService } from 'src/app/services/customer.service';
import { EnableService } from 'src/app/services/enable.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  public email: string;
  public customer: Customer;
  public enables: Enable[];
  public roles: Role[];
  public userF: any;

  public showMsg: boolean = false;
  public messages: string[] = [""];


  constructor(public router: Router,
    public activatedRoute: ActivatedRoute,
    public customerService: CustomerService,
    public enableService: EnableService,
    public roleService: RoleService,
    private authFirebaseService: AuthFirebaseService) { }

  async ngOnInit() {
    let params = this.activatedRoute.params['_value'];
    this.email = params.email;
    this.findById();
    this.findAllEnable();
    this.findAllRole();
    this.userF = await this.authFirebaseService.getCurrentUser();
  }


  public findById(): void {
    this.customerService.findById(this.email).subscribe(
      data => {
        this.customer = data;
        console.table(this.customer);
      }
    );
  }

  public findAllEnable(): void {
    this.enables = this.enableService.findAll();
  }

  public findAllRole(): void {
    this.roles = this.roleService.findAll();
  }

  public update(): void {
    this.messages = [""];
    this.customerService.update(this.customer).subscribe(
      ok => {
        this.showMsg = true;
        this.messages[0] = "El customer se actualizo con éxito";
      },
      err => {
        this.showMsg = true;
        this.messages = err.error.error;
      }
    );
  }
  public delete(): void {
    this.messages = [""];
    this.customerService.delete(this.customer.email).subscribe(
      ok => {
        this.showMsg = true;
        this.messages[0] = "El customer se elimino con éxito";
      },
      err => {
        this.showMsg = true;
        this.messages = err.error.error;
      }
    );
  }
}

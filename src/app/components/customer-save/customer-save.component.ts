import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/domain/customer';
import { Enable } from 'src/app/domain/enable';
import { Role } from 'src/app/domain/role';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { CustomerService } from 'src/app/services/customer.service';
import { EnableService } from 'src/app/services/enable.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-customer-save',
  templateUrl: './customer-save.component.html',
  styleUrls: ['./customer-save.component.css']
})
export class CustomerSaveComponent implements OnInit {

  public customer: Customer;
  public enables: Enable[];
  public roles: Role[];

  public showMsg: boolean = false;
  public messages: string[] = [""];

  constructor(public customerService: CustomerService,
    public enableService: EnableService,
    public roleService: RoleService,
    private authFirebaseService: AuthFirebaseService) { }

  ngOnInit(): void {
    this.customer = new Customer("", "", "Y", "", "", "", "A");
    this.findAllEnable();
    this.findAllRole();
  }

  public findAllEnable(): void {
    this.enables = this.enableService.findAll();
  }

  public findAllRole(): void {
    this.roles = this.roleService.findAll();
  }

  public save(): void {
    this.messages = [""];
    this.authFirebaseService.registerFirebase(this.customer.email, this.customer.token).then(result => {
      this.customer.token = result.user.uid;
      this.customerService.save(this.customer).subscribe(
        ok => {
          this.showMsg = true;
          this.messages[0] = "El customer se guardo correctamente";
          this.customer = new Customer("", "", "Y", "", "", "", "A");
        },
        err => {
          this.showMsg = true;
          this.messages = err.error.error;
        }
      );
    }).catch((error) => {
      this.showMsg = true;
      this.messages[0] = error.message;
    });
  }
}

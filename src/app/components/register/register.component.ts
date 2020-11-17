import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/domain/customer';
import { Enable } from 'src/app/domain/enable';
import { Role } from 'src/app/domain/role';
import { User } from 'src/app/domain/user';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { EnableService } from 'src/app/services/enable.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: User;
  public customer: Customer;
  public enables: Enable[];
  public roles: Role[];

  public showMsg: boolean = false;
  public messages: string[] = [""];
  constructor(private authFirebaseService: AuthFirebaseService, private router: Router, public customerService: CustomerService,
    public enableService: EnableService,
    public roleService: RoleService, private authService: AuthService,) { }

  ngOnInit(): void {
    this.customer = new Customer("", "", "Y", "", "", "", "A");
    this.user = new User("", "");
    this.findAllEnable();
    this.findAllRole();
  }

  public findAllEnable(): void {
    this.enables = this.enableService.findAll();
  }

  public findAllRole(): void {
    this.roles = this.roleService.findAll();
  }

  registrar() {
    this.authFirebaseService.registerFirebase(this.customer.email, this.customer.token).then(result => {
      this.user.username = "admin";
      this.user.password = "password";
      this.customer.token = result.user.uid;
      this.authService.loginUser(this.user).subscribe(
        data => {
          localStorage.setItem("tokenR", data.token);
          this.customerService.saveRegistro(this.customer).subscribe(
            ok => {
              localStorage.clear();
              this.router.navigate(['/email']);
            },
            err => {
              this.showMsg = true;
              this.messages = err.error.error;
            }
          );
        }, err => {
          this.showMsg = true;
          this.messages[0] = "Error";
        });
    }).catch((error) => {
      this.showMsg = true;
      this.messages[0] = error.message;
    });
  }
}

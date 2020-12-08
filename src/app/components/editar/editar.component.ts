import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/domain/customer';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  public email: string;
  public customer: Customer;
  public showMsg: boolean = false;
  public messages: string[] = [""];
  constructor(private authFirebaseService: AuthFirebaseService, public customerService: CustomerService,) { }

  ngOnInit(): void {
    this.miPerfil();
  }

  async miPerfil() {
    this.authFirebaseService.afAuth.user.subscribe(
      data => {
        if (data) {
          this.customerService.findById(data.email).subscribe(
            data => {
              this.customer = data;
            }
          );
        }
      }
    );
  }

  async recuperar() {
    try {
      await this.authFirebaseService.resetPassword(this.customer.email);
      Swal.fire(
        'Email enviado a ' + this.customer.email,
        'Revisa tu bandeja de entrada para reestablecer la contraseña',
        'success'
      );
    } catch (error) {
      console.log(error);
    }
  }

  async update() {
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

}

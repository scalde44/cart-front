import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/domain/shoppingCart';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { CartService } from 'src/app/services/cart.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  public shca: ShoppingCart[];
  pageActual: number = 1;
  constructor(private authFirebaseService: AuthFirebaseService, private cartService: CartService) { }

  ngOnInit(): void {
    this.findShcaByEmail();
    NavbarComponent.showC = false;
  }

  public findShcaByEmail(): void {
    this.authFirebaseService.afAuth.user.subscribe(
      data => {
        if (data) {
          this.cartService.findShcaByEmail(data.email).subscribe(
            data => {
              this.shca = data;
            }
          );
        }

      }
    );
  }

}

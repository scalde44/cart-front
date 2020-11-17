import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Email } from 'src/app/domain/email';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public userF$: Observable<any> = this.authFirebaseService.afAuth.user;
  constructor(private authFirebaseService: AuthFirebaseService, private router: Router) { }


  async logout() {
    try {
      await this.authFirebaseService.logoutFirebase();
      localStorage.clear();
      this.router.navigate(['/login']);
    } catch (error) {
      this.router.navigate(['/home']);
    }
  }

  public isAuth(): boolean {
    return !!localStorage.getItem('usuario');
  }

  public isAdmin(): boolean {
    if (localStorage.getItem('rol') == 'A') {
      return true;
    } else {
      return false;
    }
  }

  


}

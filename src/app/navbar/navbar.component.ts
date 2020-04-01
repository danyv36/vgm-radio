import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/appuser.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  appUser: AppUser;
  isLoggedIn = false;
  subscription: Subscription;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.subscription = this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {
    this.auth.logout();
  }

  get isAdmin() {
    return this.appUser.roles && this.appUser.roles.admin;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

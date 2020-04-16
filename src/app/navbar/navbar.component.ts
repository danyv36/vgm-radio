import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth.service";
import { AppUser } from "../models/appuser.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  subscription: Subscription;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.subscription = this.auth.appUser$.subscribe((appUser) => {
      this.appUser = appUser;
    });
  }

  logout() {
    this.auth.logout();
  }

  get isAdmin() {
    return this.appUser.roles && this.appUser.roles.admin;
    // return this.auth.appUser && this.auth.appUser.roles.admin;
  }

  get isLoggedIn() {
    return this.appUser && this.appUser.displayName;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

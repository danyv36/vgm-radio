import { Injectable } from "@angular/core";
import { CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { AppUser } from "../models/appuser.model";

@Injectable({
  providedIn: "root",
})
export class AdminAuthGuardService implements CanActivate {
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(_route, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.appUser$.pipe(
      map((appUser: AppUser) => {
        if (appUser.roles && appUser.roles.admin) {
          console.log("is admin");
          return true;
        }

        console.log("not an admin");
        this.router.navigate(["/login"], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      })
    );
  }
}

import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, of } from 'rxjs';
import { switchMap, map, share } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../models/appuser.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.user$ = afAuth.authState;
  }

  login() {
    // with ActivatedRoute we can get the current route
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    // to redirect them to where they came from after logging in
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser | any> {
    return this.user$.pipe(
      switchMap((user) => {
        console.log('logged in user::', user);
        if (user) {
          return this.userService.get(user.uid);
        } else {
          return of(null);
        }
      }),
      share()
    );
  }
}

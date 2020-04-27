import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/appuser.model';
import { Subscription } from 'rxjs';
import { PlaylistState } from '../playlists/playlists.state';
import { filter } from 'rxjs/operators';
import { AppUtils } from '../utils/utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  subscription: Subscription[] = [];

  constructor(
    private auth: AuthService,
    private playlistState: PlaylistState,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.subscription.push(
      this.auth.appUser$.subscribe((appUser) => {
        this.appUser = appUser;
      })
    );

    this.subscription.push(
      this.playlistState.playlistAction$
        .pipe(filter((v) => v.action != 'INIT'))
        .subscribe((value) => {
          if (value.action === 'CREATED') {
            AppUtils.openSnackbar(this.snackbar, 'Playlist created');
          } else if (value.action === 'DELETED') {
            AppUtils.openSnackbar(this.snackbar, 'Playlist deleted');
          }
        })
    );
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
    this.subscription.forEach((s) => s.unsubscribe());
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/appuser.model';
import { Subscription } from 'rxjs';
import { PlaylistState } from '../playlists/playlists.state';
import { filter } from 'rxjs/operators';
import { AppUtils } from '../utils/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { FormControl } from '@angular/forms';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  subscription: Subscription[] = [];
  searchBy: SearchBy = 'Game';
  searchByFilter = new FormControl('');

  constructor(
    private auth: AuthService,
    private playlistState: PlaylistState,
    private snackbar: MatSnackBar,
    private songService: SongService
  ) {}

  ngOnInit() {
    this.subscription.push(
      this.auth.appUser$.subscribe((appUser) => {
        this.appUser = appUser;
      })
    );

    this.subscription.push(
      this.playlistState.playlistAction$
        .pipe(filter((v) => v.action !== 'INIT'))
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

  getSearchByClass(input: SearchBy) {
    return input === this.searchBy ? 'search-by' : 'non-search-by';
  }

  setSearchBy(searchBy: MatButtonToggleChange) {
    this.searchBy = searchBy.value;
  }

  onSearch(filter: string) {
    if (filter.length > 0) {
      // call database to filterrrr
      this.songService.searchByGame(filter.toLowerCase()).subscribe((s) => {
        console.log('wots this::', s);
      });
    }
  }

  ngOnDestroy() {
    this.subscription.forEach((s) => s.unsubscribe());
  }
}

export type SearchBy = 'Game' | 'Song';

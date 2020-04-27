import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ISong } from '../models/songs.model';
import { PlaylistService } from '../services/playlist.service';
import { AppUser } from '../models/appuser.model';
import { IPlaylist } from '../models/playlist.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlaylistState, IPlaylistState } from '../playlists/playlists.state';
import { MusicPlayerState } from './music-player.state';
import { AppUtils } from '../utils/utils';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistDialogComponent } from '../my-playlist/playlist-dialog/playlist-dialog.component';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  @Input() songs: ISong[];
  @Input() displayPlaylists: string;
  @Output() deleteFromPlaylist = new EventEmitter();
  subscriptions: Subscription[] = [];
  playlists: IPlaylist[];
  imageSrc: string;
  appUser: AppUser;
  isLoading = true;

  constructor(
    private musicPlayerState: MusicPlayerState,
    private playlistService: PlaylistService,
    private playlistState: PlaylistState,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.musicPlayerState.playerState$.subscribe((state) => {
        if (!!state.playlistsLoaded && !!state.songsLoaded) {
          this.isLoading = false;
        }
      })
    );

    const uid = localStorage.getItem('uid');
    console.log('uid::', uid);
    if (uid) {
      this.playlistState.getPlaylists(uid);

      this.subscriptions.push(
        this.playlistState.playlists$.subscribe((result: IPlaylistState) => {
          console.log('playlists from state::', result);
          this.playlists = result.playlists;
          this.musicPlayerState.updateState({ playlistsLoaded: true });
        })
      );
    } else {
      console.log('did not fetch playlists because no user id was provided!');
      this.musicPlayerState.updateState({ playlistsLoaded: true });
    }
  }

  async addToPlaylist(song: ISong, playlistKey: string) {
    await this.playlistService.addSongToPlaylist(song, playlistKey);
    AppUtils.openSnackbar(this.snackBar, 'Song added to playlist');
  }

  async removeFromPlaylist(song: ISong) {
    this.deleteFromPlaylist.emit(song);
  }

  get showPlaylists(): boolean {
    return JSON.parse(this.displayPlaylists);
  }

  createPlaylist(): void {
    this.dialog.open(PlaylistDialogComponent, {
      width: '500px',
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}

export interface IPlayerState {
  playlistsLoaded?: boolean;
  songsLoaded?: boolean;
}

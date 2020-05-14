import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from '../services/playlist.service';
import { switchMap, catchError, map, filter } from 'rxjs/operators';
import { IPlaylist } from '../models/playlist.model';
import { of, Subscription } from 'rxjs';
import { ISong } from '../models/songs.model';
import * as _ from 'lodash';
import { MusicPlayerState } from '../music-player/music-player.state';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistDialogComponent } from './playlist-dialog/playlist-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlaylistState } from '../playlists/playlists.state';
import { AppUtils } from '../utils/utils';

@Component({
  selector: 'app-my-playlist',
  templateUrl: './my-playlist.component.html',
  styleUrls: ['./my-playlist.component.css'],
})
export class MyPlaylistComponent implements OnInit, OnDestroy {
  playlistId: string;
  playlist: IPlaylist;
  subscription: Subscription[] = [];
  songs: ISong[];
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private musicPlayerState: MusicPlayerState,
    private playlistState: PlaylistState,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscription.push(
      this.route.paramMap
        .pipe(
          switchMap((params) => {
            this.playlistId = params.get('playlistId');
            return this.playlistService.getPlaylistById(this.playlistId);
          }),
          map((playlist: IPlaylist) => {
            const songs = Object.keys(playlist.songs).map((key) => {
              return {
                key,
                ...playlist.songs[key],
              };
            });
            return {
              ...playlist,
              songs,
            };
          })
        )
        .subscribe((playlist: IPlaylist) => {
          this.playlist = playlist;
          this.songs = playlist.songs;
          this.musicPlayerState.updateState({ songsLoaded: true });
        })
    );

    this.subscription.push(
      this.musicPlayerState.playerState$.subscribe((state) => {
        if (!!state.playlistsLoaded && !!state.songsLoaded) {
          this.isLoading = false;
        }
      })
    );

    this.subscription.push(
      this.playlistState.playlistAction$
        .pipe(filter((v) => v.action === 'UPDATED'))
        .subscribe((_value) => {
          AppUtils.openSnackbar(this.snackBar, 'Playlist updated');
        })
    );
  }

  handleEdit(): void {
    this.dialog.open(PlaylistDialogComponent, {
      width: '500px',
      data: {
        key: this.playlistId,
        ...this.playlist,
      },
    });
  }

  async handleDelete(song: ISong) {
    await this.playlistService.deleteSongFromPlaylist(
      song.key,
      this.playlistId
    );
    AppUtils.openSnackbar(this.snackBar, 'Song removed from playlist');
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => s.unsubscribe());
  }
}

import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IPlaylist } from '../models/playlist.model';
import { PlaylistState, IPlaylistState } from './playlists.state';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistDialogComponent } from '../my-playlist/playlist-dialog/playlist-dialog.component';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css'],
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  playlists: IPlaylist[];
  subscriptions: Subscription[] = [];

  constructor(
    private playlistState: PlaylistState,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.playlistState.playlists$.subscribe((result: IPlaylistState) => {
        this.playlists = result.playlists;
      })
    );
  }

  createPlaylist(): void {
    this.dialog.open(PlaylistDialogComponent, {
      width: '500px',
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}

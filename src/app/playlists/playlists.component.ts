import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IPlaylist } from '../models/playlist.model';
import { PlaylistState, IPlaylistState } from './playlists.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css'],
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  playlists: IPlaylist[];
  subscriptions: Subscription[] = [];

  constructor(private playlistState: PlaylistState) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.playlistState.playlists$.subscribe((result: IPlaylistState) => {
        console.log('results???:', result);
        this.playlists = result.playlists;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}

import { PlaylistService } from '../services/playlist.service';
import { BehaviorSubject } from 'rxjs';
import { IPlaylist } from '../models/playlist.model';
import { Injectable } from '@angular/core';

@Injectable()
export class PlaylistState {
  playlists$: BehaviorSubject<IPlaylistState> = new BehaviorSubject({
    loaded: false,
  });

  playlistAction$: BehaviorSubject<IPlaylistActionState> = new BehaviorSubject({
    action: 'INIT',
  });

  constructor(private service: PlaylistService) {}

  getPlaylists(uid: string) {
    this.service.getUserPlaylists(uid).subscribe((playlists: IPlaylist[]) => {
      console.log('playlists fetched::', playlists);
      this.playlists$.next({ loaded: true, playlists });
    });
  }
}

export interface IPlaylistState {
  loaded: boolean;
  playlists?: IPlaylist[];
}

export interface IPlaylistActionState {
  action: 'CREATED' | 'UPDATED' | 'DELETED' | 'INIT';
}

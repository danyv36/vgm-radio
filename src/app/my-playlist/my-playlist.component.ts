import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from '../services/playlist.service';
import { switchMap, catchError, map } from 'rxjs/operators';
import { IPlaylist } from '../models/playlist.model';
import { of, Subscription } from 'rxjs';
import { ISong } from '../models/songs.model';
import * as _ from 'lodash';
import { MusicPlayerState } from '../music-player/music-player.state';

@Component({
  selector: 'app-my-playlist',
  templateUrl: './my-playlist.component.html',
  styleUrls: ['./my-playlist.component.css'],
})
export class MyPlaylistComponent implements OnInit, OnDestroy {
  playlistId: string;
  playlist: IPlaylist;
  subscription: Subscription;
  songs: ISong[];

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private musicPlayerState: MusicPlayerState
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.playlistId = params.get('playlistId');
          return this.playlistService.getPlaylistById(this.playlistId);
        })
      )
      .pipe(
        map((playlist: IPlaylist) => ({
          ...playlist,
          songs: _.isNil(playlist.songs) ? [] : Object.values(playlist.songs),
        }))
      )
      .subscribe((playlist: IPlaylist) => {
        this.playlist = playlist;
        this.songs = playlist.songs;
        this.musicPlayerState.updateState({ songsLoaded: true });
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicPlayerState } from '../music-player/music-player.state';
import { SongService } from '../services/song.service';
import { Subscription } from 'rxjs';
import { ISong } from '../models/songs.model';
import { PlaylistState } from '../playlists/playlists.state';
import { filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppUtils } from '../utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  songs: ISong[];
  constructor(
    private musicPlayerState: MusicPlayerState,
    private songService: SongService,
    private playlistState: PlaylistState,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.songService.getAll().subscribe((songs: ISong[]) => {
        console.log('music player songs fetched::', songs);
        this.songs = songs;
        this.musicPlayerState.updateState({ songsLoaded: true });
      })
    );

    this.subscriptions.push(
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}

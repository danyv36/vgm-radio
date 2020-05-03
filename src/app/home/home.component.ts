import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicPlayerState } from '../music-player/music-player.state';
import { SongService } from '../services/song.service';
import { Subscription } from 'rxjs';
import { ISong } from '../models/songs.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  songs: ISong[];
  offset = 4; // number of songs to display per page
  nextKey: any; // for next button
  prevKeys: any[] = []; // for prev button
  constructor(
    private musicPlayerState: MusicPlayerState,
    private songService: SongService
  ) {}

  ngOnInit(): void {
    this.getSongs();
  }

  getSongs(key?: string) {
    this.subscription = this.songService
      .getAll(this.offset, key)
      .subscribe((songs: ISong[]) => {
        console.log('music player songs fetched::', songs);
        this.songs = songs;

        if (!_.isNil(this.songs)) {
          const songsSliced = _.slice(this.songs, 0, this.offset);
          console.log(
            'songs received for music player component::',
            this.songs
          );
          console.log('songsSliced::', songsSliced);
          this.nextKey = _.get(this.songs[4], 'key');
          console.log('nextKey::', this.nextKey);
        }
        this.musicPlayerState.updateState({ songsLoaded: true });
      });
  }

  nextPage() {
    console.log('this.nextKey::', this.nextKey);
    this.prevKeys.push(_.first(this.songs)['key']); // set current key as pointer for previous page
    this.getSongs(this.nextKey);
  }

  prevPage() {
    const prevKey = _.last(this.prevKeys); // use last key in array
    this.prevKeys = _.dropRight(this.prevKeys); // then remove the last key in the array
    console.log('prevKey::', prevKey);
    this.getSongs(prevKey);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { SongService } from '../song.service';
import { Subscription } from 'rxjs';
import { ISong } from '../models/songs.model';
import { Sm2BarPlayerService } from '../window-ref.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  songs: ISong[];

  constructor(private songService: SongService, private windowRef: Sm2BarPlayerService) { 
  }

  ngOnInit(): void {
    this.subscription = this.songService.getAll().subscribe((songs: ISong[]) => {
      console.log('music player songs fetched::', songs);
      this.songs = songs;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


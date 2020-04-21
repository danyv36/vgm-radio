import { Component, OnInit, OnDestroy } from "@angular/core";
import { MusicPlayerState } from '../music-player/music-player.state';
import { SongService } from '../services/song.service';
import { Subscription } from 'rxjs';
import { ISong } from '../models/songs.model';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  songs: ISong[];
  constructor(private musicPlayerState: MusicPlayerState, private songService: SongService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.songService.getAll().subscribe((songs: ISong[]) => {
        console.log("music player songs fetched::", songs);
        this.songs = songs;
        this.musicPlayerState.updateState({ songsLoaded: true });
      }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}

import { Component, OnInit, OnDestroy } from "@angular/core";
import { SongService } from "../services/song.service";
import { Subscription } from "rxjs";
import { ISong } from "../models/songs.model";
import { PlaylistService } from "../services/playlist.service";
import { AppUser } from "../models/appuser.model";
import { IPlaylist } from "../models/playlist.model";

@Component({
  selector: "app-music-player",
  templateUrl: "./music-player.component.html",
  styleUrls: ["./music-player.component.scss"],
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  songs: ISong[];
  playlists: IPlaylist[];
  imageSrc: string;
  appUser: AppUser;

  constructor(
    private songService: SongService,
    private playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.songService.getAll().subscribe((songs: ISong[]) => {
        console.log("music player songs fetched::", songs);
        this.songs = songs;
      })
    );

    const uid = localStorage.getItem("uid");
    console.log("uid::", uid);
    if (uid) {
      this.subscriptions.push(
        this.playlistService
          .getUserPlaylists(uid)
          .subscribe((playlists: IPlaylist[]) => {
            console.log("playlists fetched::", playlists);
            this.playlists = playlists;
          })
      );
    }
  }

  addToPlaylist(song: ISong, playlistKey: string) {
    console.log("song::", song);
    console.log("playlistKey::", playlistKey);
    this.playlistService.addSongToPlaylist(song, playlistKey);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}

import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { SongService } from "../services/song.service";
import { Subscription, BehaviorSubject } from "rxjs";
import { ISong } from "../models/songs.model";
import { PlaylistService } from "../services/playlist.service";
import { AppUser } from "../models/appuser.model";
import { IPlaylist } from "../models/playlist.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PlaylistState, IPlaylistState } from "../playlists/playlists.state";
import { MusicPlayerState } from "./music-player.state";

@Component({
  selector: "app-music-player",
  templateUrl: "./music-player.component.html",
  styleUrls: ["./music-player.component.scss"],
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  @Input() songs: ISong[];
  @Input() fetchPlaylists: string;
  subscriptions: Subscription[] = [];
  playlists: IPlaylist[];
  imageSrc: string;
  appUser: AppUser;
  isLoading = true;

  constructor(
    private musicPlayerState: MusicPlayerState,
    private playlistService: PlaylistService,
    private playlistState: PlaylistState,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.musicPlayerState.playerState$.subscribe((state) => {
        if (!!state.playlistsLoaded && !!state.songsLoaded) {
          this.isLoading = false;
        }
      })
    );

    const uid = localStorage.getItem("uid");
    console.log("uid::", uid);
    if (uid && Boolean(this.fetchPlaylists)) {
      this.playlistState.getPlaylists(uid);

      this.subscriptions.push(
        this.playlistState.playlists$.subscribe((result: IPlaylistState) => {
          console.log("playlists from state::", result);
          this.playlists = result.playlists;
          this.musicPlayerState.updateState({ playlistsLoaded: true });
        })
      );
    } else {
      console.log("did not fetch playlists!");
      this.musicPlayerState.updateState({ playlistsLoaded: true });
    }
  }

  openSnackBar() {
    this.snackBar.open("Song added to playlist", "Dismiss", {
      duration: 3000,
    });
  }

  async addToPlaylist(song: ISong, playlistKey: string) {
    await this.playlistService.addSongToPlaylist(song, playlistKey);
    this.openSnackBar();
  }

  get showPlaylists(): boolean {
    return JSON.parse(this.fetchPlaylists);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}

export interface IPlayerState {
  playlistsLoaded?: boolean;
  songsLoaded?: boolean;
}

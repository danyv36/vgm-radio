import { Component, OnInit, OnDestroy } from "@angular/core";
import { SongService } from "../services/song.service";
import { Subscription, BehaviorSubject } from "rxjs";
import { ISong } from "../models/songs.model";
import { PlaylistService } from "../services/playlist.service";
import { AppUser } from "../models/appuser.model";
import { IPlaylist } from "../models/playlist.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PlaylistState, IPlaylistState } from "../playlists/playlists.state";

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
  playerState = new BehaviorSubject<IPlayerState>({
    playlistsLoaded: false,
    songsLoaded: false,
  });
  isLoading = true;

  constructor(
    private songService: SongService,
    private playlistService: PlaylistService,
    private playlistState: PlaylistState,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.songService.getAll().subscribe((songs: ISong[]) => {
        console.log("music player songs fetched::", songs);
        this.songs = songs;
        this.updateState({ songsLoaded: true });
      })
    );

    this.subscriptions.push(
      this.playerState.subscribe((state) => {
        if (!!state.playlistsLoaded && !!state.songsLoaded) {
          this.isLoading = false;
        }
      })
    );

    const uid = localStorage.getItem("uid");
    console.log("uid::", uid);
    if (uid) {
      this.playlistState.getPlaylists(uid);

      this.subscriptions.push(
        this.playlistState.playlists$.subscribe((result: IPlaylistState) => {
          console.log("playlists from state::", result);
          this.playlists = result.playlists;
          this.updateState({ playlistsLoaded: true });
        })
        // this.playlistService
        //   .getUserPlaylists(uid)
        //   .subscribe((playlists: IPlaylist[]) => {
        //     console.log("playlists fetched::", playlists);
        //     this.playlists = playlists;
        //     this.updateState({ playlistsLoaded: true });
        //   })
      );
    } else {
      this.updateState({ playlistsLoaded: true });
    }
  }

  openSnackBar() {
    this.snackBar.open("Song added to playlist", "Dismiss", {
      duration: 3000,
    });
  }

  updateState(newState: IPlayerState) {
    this.playerState.next({ ...this.playerState.value, ...newState });
  }

  async addToPlaylist(song: ISong, playlistKey: string) {
    await this.playlistService.addSongToPlaylist(song, playlistKey);
    this.openSnackBar();
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

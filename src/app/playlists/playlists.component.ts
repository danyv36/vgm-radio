import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { IPlaylist } from "../models/playlist.model";
import { PlaylistService } from "../services/playlist.service";
import { PlaylistState, IPlaylistState } from "./playlists.state";
import { Subscription } from "rxjs";

@Component({
  selector: "app-playlists",
  templateUrl: "./playlists.component.html",
  styleUrls: ["./playlists.component.css"],
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  playlists: IPlaylist[];
  subscriptions: Subscription[] = [];

  constructor(
    private playlistService: PlaylistService,
    private playlistState: PlaylistState
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.playlistState.playlists$.subscribe((result: IPlaylistState) => {
        this.playlists = result.playlists;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}

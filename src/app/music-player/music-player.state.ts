import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { ISong } from "../models/songs.model";
import { SongService } from "../services/song.service";

@Injectable()
export class MusicPlayerState {
  playerState$ = new BehaviorSubject<IMusicPlayerState>({
    playlistsLoaded: false,
    songsLoaded: false,
  });

  constructor(private songService: SongService) {}

  updateState(newState: IMusicPlayerState) {
    this.playerState$.next({ ...this.playerState$.value, ...newState });
  }
}

export interface IMusicPlayerState {
  playlistsLoaded?: boolean;
  songsLoaded?: boolean;
}

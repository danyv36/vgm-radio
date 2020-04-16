import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs";
import { IPlaylist } from "./models/playlist.model";
import { map } from "rxjs/operators";
import { ISong } from "./models/songs.model";

@Injectable({
  providedIn: "root",
})
export class PlaylistService {
  constructor(private db: AngularFireDatabase) {}

  getUserPlaylists(uid: string): Observable<any> {
    return this.db
      .list("/playlists", (ref) => ref.orderByChild("userId").equalTo(uid))
      .snapshotChanges()
      .pipe(
        map((playlists) => {
          console.log("playlists being returned::", playlists);
          return playlists.map((p) => ({
            key: p.payload.key,
            ...(p.payload.val() as Object),
          }));
        })
      );
  }

  addSongToPlaylist(song: ISong, key: string): Promise<void> {
    if (!key) {
      throw new Error("No key was provided to update the playlist.");
    }

    const songKey = song.key;
    delete song.key;

    return this.db.object(`/playlists/${key}/songs/${songKey}`).update(song);
  }
}

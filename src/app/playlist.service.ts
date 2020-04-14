import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { IPlaylist } from './models/playlist.model';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private db: AngularFireDatabase) { }

  getUserPlaylists(uid: string): Observable<any> {
    return this.db.list('/playlists', ref => ref.orderByChild('userId').equalTo(uid)).valueChanges();
  }
}

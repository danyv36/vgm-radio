import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { ISong } from '../models/songs.model';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  constructor(private db: AngularFireDatabase) {}

  save(song) {
    return this.db
      .list('/songs')
      .push(song)
      .then((val) => {
        console.log('song saved::', val);
      });
  }

  async update(song: ISong, key: string) {
    if (!key) {
      throw new Error('No key was provided to update the song.');
    }
    delete song.key;
    return this.db.object(`/songs/${key}`).update(song);
  }

  delete(key: string) {
    return this.db.object(`/songs/${key}`).remove();
  }

  getAll(offset: number = 4, startKey?: string) {
    let queryFn;
    if (startKey) {
      queryFn = (ref) =>
        ref
          .orderByKey()
          .startAt(startKey)
          .limitToFirst(offset + 1);
    } else {
      queryFn = (ref) => ref.orderByKey().limitToFirst(offset + 1);
    }
    return this.db
      .list('songs', queryFn)
      .snapshotChanges()
      .pipe(
        map((songs) => {
          return songs.map((s) => ({
            key: s.payload.key,
            ...(s.payload.val() as Object),
          }));
        })
      );
  }

  searchByGame(filter: string, offset: number = 4) {
    return this.db
      .list('/songs', (ref) =>
        ref
          .orderByChild('search/game')
          .startAt(filter)
          .endAt(filter + '\uf8ff')
      )
      .snapshotChanges()
      .pipe(
        map((songs) => {
          return songs.map((s) => ({
            key: s.payload.key,
            ...(s.payload.val() as Object),
          }));
        })
      );
  }
}

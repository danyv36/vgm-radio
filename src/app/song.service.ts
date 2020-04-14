import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { ISong } from './models/songs.model';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private db: AngularFireDatabase) { }

  save(song) {
    return this.db.list('/songs').push(song).then((val) => {
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

  getAll() {
    return this.db.list('songs').snapshotChanges().pipe(
      map(songs => {
        console.log('songs being returned::', songs);
        return songs.map(s => ({
          key: s.payload.key,
          ...(s.payload.val() as Object)
        }));
      })
    );
  }
}

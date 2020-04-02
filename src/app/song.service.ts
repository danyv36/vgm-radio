import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { ISong } from './models/songs.model';
import { Observable } from 'rxjs';

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

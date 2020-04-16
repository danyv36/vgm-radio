import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import * as firebase from "firebase";
import { AppUser } from "./models/appuser.model";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  save(user: firebase.User) {
    this.db.object(`/users/${user.uid}`).update({
      displayName: user.displayName,
      email: user.email,
    });
  }

  get(uid: string): Observable<AppUser> {
    return this.db
      .object(`/users/${uid}`)
      .valueChanges()
      .pipe(
        map((user: AppUser) => {
          const appUser = {
            ...user,
            uid,
          };

          localStorage.setItem("uid", uid);
          return appUser;
        })
      );
  }
}

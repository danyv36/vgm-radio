import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AppUser } from './models/appuser.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // songs: Observable<any[]>; if youre not subscribing...
  songs: any[];
  song$: Observable<any>;

  constructor(private auth: AuthService, router: Router, private userService: UserService) {
    auth.user$.subscribe(user => {
      if (user) {
        userService.save(user);

        // const returnUrl = localStorage.getItem('returnUrl');
        // if (returnUrl) {
        //   localStorage.removeItem('returnUrl');
        //   router.navigateByUrl(returnUrl);
        // }
        // router.navigateByUrl(returnUrl);
      }
    });
    // db.list('/songs').valueChanges().subscribe((songs) => {
    //   this.songs = songs;
    //   console.log(this.songs);
    // });

    // this.song$ = db.object('/songs/1').valueChanges();
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { AppUser } from './models/appuser.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // songs: Observable<any[]>; if youre not subscribing...
  songs: any[];
  song$: Observable<any>;

  constructor(
    private auth: AuthService,
    router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.userService.save(user);

        // store uid in sessionStorage
        sessionStorage.setItem('uid', user.uid);

        // const returnUrl = localStorage.getItem('returnUrl');
        // if (returnUrl) {
        //   localStorage.removeItem('returnUrl');
        //   router.navigateByUrl(returnUrl);
        // }
        // router.navigateByUrl(returnUrl);
      }
    });
  }
}

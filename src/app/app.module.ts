import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { environment } from "src/environments/environment";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import {
  NoopAnimationsModule,
  BrowserAnimationsModule,
} from "@angular/platform-browser/animations";
import { HomeComponent } from "./home/home.component";
import { AdminComponent } from "./admin/admin.component";
import { LoginComponent } from "./login/login.component";
import { RouterModule } from "@angular/router";
import { NoAccessComponent } from "./no-access/no-access.component";
import { AuthService } from "./services/auth.service";
import { NavbarComponent } from "./navbar/navbar.component";

import { MatSidenavModule } from "@angular/material/sidenav";
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
// import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from "@angular/material/table";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { TestComponent } from "./test/test.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { UserService } from "./services/user.service";
import { AdminAuthGuardService } from "./services/admin-auth-guard.service";
import { AdminSongsComponent } from "./admin/admin-songs/admin-songs.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SongService } from "./services/song.service";
import { SongsTableComponent } from "./admin/songs-table/songs-table.component";
import { AdminDialogComponent } from "./admin/admin-dialog/admin-dialog.component";
import { HoldableDirective } from "./holdable.directive";
import { MusicPlayerComponent } from "./music-player/music-player.component";
import { Sm2BarPlayerService } from "./services/window-ref.service";
import { ScriptService } from "./services/script.service";
import { PlaylistService } from "./services/playlist.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    LoginComponent,
    NoAccessComponent,
    NavbarComponent,
    TestComponent,
    AdminSongsComponent,
    SongsTableComponent,
    AdminDialogComponent,
    HoldableDirective,
    MusicPlayerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatSnackBarModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "admin/songs", component: AdminSongsComponent }, // , canActivate: [AdminAuthGuardService] },
      {
        path: "admin",
        component: AdminComponent,
        canActivate: [AdminAuthGuardService],
      },
      { path: "login", component: LoginComponent },
      { path: "no-access", component: NoAccessComponent },
    ]),
  ],
  exports: [MatMenuModule, MatFormFieldModule],
  entryComponents: [AdminDialogComponent],
  providers: [
    AuthService,
    AuthGuardService,
    AdminAuthGuardService,
    UserService,
    SongService,
    Sm2BarPlayerService,
    ScriptService,
    PlaylistService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

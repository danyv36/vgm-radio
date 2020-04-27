import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlaylistService } from 'src/app/services/playlist.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/admin/utils/error-state-matcher';
import { IPlaylist } from 'src/app/models/playlist.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-playlist-dialog',
  templateUrl: './playlist-dialog.component.html',
  styleUrls: ['./playlist-dialog.component.css'],
})
export class PlaylistDialogComponent implements OnInit {
  deleteProgress = 0;
  editMode: boolean;
  playlist: IPlaylist;
  matcher = new MyErrorStateMatcher();

  form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.maxLength(100)],
  });

  constructor(
    public dialogRef: MatDialogRef<PlaylistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private playlistService: PlaylistService,
    private fb: FormBuilder
  ) {
    console.log('data received in dialog::', data);
    this.editMode = !!data;
    this.playlist = data;
  }

  ngOnInit(): void {
    this.updatePlaylistValues(this.playlist);
  }

  onPlaylistSaved(): void {
    console.log('hello!! playlist was saved!!');
    this.dialogRef.close();
  }

  // TODO:: make this common
  getControl(controlName: string): FormControl {
    const control = this.form.get(controlName) as FormControl;
    if (control) {
      return control;
    }
  }

  // TODO: make this common
  updatePlaylistValues(playlist: IPlaylist) {
    if (!playlist) {
      return;
    }
    Object.keys(playlist).forEach((key) => {
      const control = this.getControl(key);
      if (control && !_.isNil(playlist[key])) {
        control.setValue(playlist[key]);
      }
    });
  }

  holdHandler(e) {
    console.log(e);
    this.deleteProgress = e / 10;
    if (this.deleteProgress > 100) {
      this.dialogRef.close();
    }
  }

  async onSubmit() {
    const playlist: IPlaylist = this.form.value;
    if (!this.playlist) {
      playlist.dateCreated = new Date().toISOString();
      this.playlistService.save(playlist);

      this.form.reset();
      this.form.markAsPristine();
      this.form.markAsUntouched();
      this.dialogRef.close('CREATED');
    } else {
      playlist.dateUpdated = new Date().toISOString();
      await this.playlistService.update(playlist, this.playlist.key);
      console.log('done updating playlist! :)');
      this.dialogRef.close('UPDATED');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

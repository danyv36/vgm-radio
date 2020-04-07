import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISong } from 'src/app/models/songs.model';
import { SongService } from 'src/app/song.service';

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.css']
})
export class AdminDialogComponent implements OnInit {

  deleteProgress = 0;
  editMode: boolean;

  constructor(public dialogRef: MatDialogRef<AdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ISong, private songService: SongService) {
    console.log('data received in dialog::', data);
    this.editMode = !!data && !!data.key;
  }

  ngOnInit(): void {
  }

  onSongSaved(): void {
    console.log('hello!! song was saved!!');
    this.dialogRef.close();
  }

  holdHandler(e) {
    console.log(e);
    this.deleteProgress = e / 10;
    if (this.deleteProgress > 100) {
      this.songService.delete(this.data.key);
      this.dialogRef.close();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

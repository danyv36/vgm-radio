import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminDialogComponent } from './admin-dialog/admin-dialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  addSongs() {
    const dialogRef = this.dialog.open(AdminDialogComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed::', result);
    });
  }

}

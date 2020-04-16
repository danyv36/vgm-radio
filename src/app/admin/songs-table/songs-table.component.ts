import { Component, OnInit, OnDestroy } from "@angular/core";
import { SongService } from "src/app/song.service";
import { Subscription, Observable } from "rxjs";
import { ISong } from "src/app/models/songs.model";
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { AdminDialogComponent } from "../admin-dialog/admin-dialog.component";

@Component({
  selector: "app-songs-table",
  templateUrl: "./songs-table.component.html",
  styleUrls: ["./songs-table.component.scss"],
})
export class SongsTableComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  searchSubscription: Subscription;
  dataSource: MatTableDataSource<ISong>;
  isLoading = true;
  displayedColumns: string[] = ["key", "game", "title", "edit"];
  searchFilter = new FormControl("");

  constructor(private songService: SongService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.subscription = this.songService.getAll().subscribe((songs) => {
      this.dataSource = new MatTableDataSource(songs as ISong[]);
      this.isLoading = false;
      console.log("songs fetched::", songs);
    });

    this.searchSubscription = this.searchFilter.valueChanges
      .pipe(
        // filter(text => text.length > 3),
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe((v: string) => {
        this.dataSource.filter = v.trim().toLowerCase();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.searchSubscription.unsubscribe();
  }

  handleEdit(song: ISong): void {
    console.log("handling edit::", song);
    const dialogRef = this.dialog.open(AdminDialogComponent, {
      width: "500px",
      data: song,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed::", result);
    });
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

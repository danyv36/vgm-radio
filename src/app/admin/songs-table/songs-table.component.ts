import { Component, OnInit, OnDestroy } from '@angular/core';
import { SongService } from 'src/app/song.service';
import { Subscription, Observable } from 'rxjs';
import { ISong } from 'src/app/models/songs.model';
import { FormControl } from '@angular/forms';
import { filter, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-songs-table',
  templateUrl: './songs-table.component.html',
  styleUrls: ['./songs-table.component.scss']
})
export class SongsTableComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  searchSubscription: Subscription;
  dataSource: MatTableDataSource<ISong>;
  displayedColumns: string[] = ['key', 'game', 'title', 'edit'];
  searchFilter = new FormControl('');

  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.subscription = this.songService.getAll().subscribe((songs) => {
      this.dataSource = new MatTableDataSource(songs as ISong[]);
      console.log('songs fetched::', songs);
    });

    this.searchSubscription = this.searchFilter.valueChanges.pipe(
      filter(text => text.length > 3),
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe((v: string) => {
      this.dataSource.filter = v.trim().toLowerCase();
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.searchSubscription.unsubscribe();
  }

  handleEdit(song) {

    console.log('handling edit::', song);
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

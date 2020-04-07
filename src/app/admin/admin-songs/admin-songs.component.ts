import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { MyErrorStateMatcher } from '../utils/error-state-matcher';
import { SongService } from 'src/app/song.service';
import { ISong } from 'src/app/models/songs.model';

@Component({
  selector: 'app-admin-songs',
  templateUrl: './admin-songs.component.html',
  styleUrls: ['./admin-songs.component.scss']
})
export class AdminSongsComponent implements OnInit, OnDestroy {
  @Input() song: ISong;
  @Output() onSave = new EventEmitter();
  subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private songService: SongService) {
  }

  form = this.fb.group({
    title: ['', Validators.required],
    game: ['', Validators.required],
    composer: [''],
    songFilename: ['', Validators.required],
    ostImageFilename: ['', Validators.required],
    isRelaxing: [false]
  });

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    console.log('admin songs::', this.song);
    this.updateSongValues(this.song);
    const titleControl = this.getControl('title');
    const gameControl = this.getControl('game');
    const songFilenameControl = this.getControl('songFilename');
    const ostImageFilenameControl = this.getControl('ostImageFilename');

    this.subscriptions.push(titleControl.valueChanges.subscribe((value) => {
      songFilenameControl.patchValue(_.kebabCase(value));
    }));

    this.subscriptions.push(gameControl.valueChanges.subscribe((value) => {
      ostImageFilenameControl.patchValue(_.kebabCase(value));
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) =>{
      subscription.unsubscribe();
    });
  }

  updateSongValues(song: ISong) {
    if (!song) { return; }
    Object.keys(song).forEach((key) => {
      const control = this.getControl(key);
      if (control && !_.isNil(song[key])) {
        control.setValue(song[key]);
      }
    });
  }

  getControl(controlName: string): FormControl {
    const control = this.form.get(controlName) as FormControl;
    if (control) {
      return control;
    }
  }

  onSubmit() {
    const song: ISong = this.form.value;
    if (!this.song) {
      song.dateCreated = new Date().toISOString();
      this.songService.save(song);

      this.form.reset();
      this.form.markAsPristine();
      this.form.markAsUntouched();
    } else {
      song.dateUpdated = new Date().toISOString();
      this.songService.update(song, this.song.key).then(()=>{
        console.log('done updating!');
        this.onSave.emit();
      });
    }

    console.log(song);
  }

}

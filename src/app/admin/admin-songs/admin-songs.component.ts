import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { MyErrorStateMatcher } from '../utils/error-state-matcher';
import { SongService } from 'src/app/song.service';

@Component({
  selector: 'app-admin-songs',
  templateUrl: './admin-songs.component.html',
  styleUrls: ['./admin-songs.component.scss']
})
export class AdminSongsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

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
    const titleControl = this.getControl('title');
    const songFilenameControl = this.getControl('songFilename');
    this.subscription = titleControl.valueChanges.subscribe((value) => {
      songFilenameControl.patchValue(_.kebabCase(value));
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  getControl(controlName: string) {
    const control = this.form.get(controlName) as FormControl;
    if (!control) {
      throw new Error(`Could not find control with name ${controlName}`);
    }
    return control;
  }

  onSubmit() {
    const song = this.form.value;
    song.dateCreated = new Date().toISOString();
    console.log(song);

    this.songService.save(song);

    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

}

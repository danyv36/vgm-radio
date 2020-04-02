import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsTableComponent } from './songs-table.component';

describe('SongsTableComponent', () => {
  let component: SongsTableComponent;
  let fixture: ComponentFixture<SongsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from '../services/playlist.service';

@Component({
  selector: 'app-my-playlist',
  templateUrl: './my-playlist.component.html',
  styleUrls: ['./my-playlist.component.css']
})
export class MyPlaylistComponent implements OnInit {

  playlistId: string;

  constructor(private route: ActivatedRoute, private playlistService: PlaylistService) { 
    this.route.paramMap.subscribe(params => {
      this.playlistId = params.get('playlistId');
      console.log('playlistid::', this.playlistId);
      this.playlistService.getPlaylistById(this.playlistId).subscribe((p) =>{
        console.log('wtf is this::', p);
      })
    })
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.loadScript();
  }

  public loadScript() {
    const body = <HTMLDivElement>document.body;

    const script2 = document.createElement('script');
    script2.innerHTML = '';
    script2.src = '../assets/sound-manager/js/soundmanager-src/script/soundmanager2.js';
    script2.async = true;
    script2.defer = true;
    body.appendChild(script2);

    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = '../assets/sound-manager/js/bar-ui.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }

}

import { Injectable } from "@angular/core";

function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: "root",
})
export class Sm2BarPlayerService {
  constructor() {}

  get nativeWindow(): any {
    return _window();
  }

  get sm2Player(): ISm2Player {
    return this.nativeWindow.sm2BarPlayers[0];
  }

  get selectedIndex(): number {
    return this.sm2Player.playlistController.data.selectedIndex;
  }

  set selectedIndex(index: number) {
    this.selectedIndex = index;
  }
}

export interface ISm2Player {
  playlistController: {
    data: {
      selectedIndex: number;
      playlist: HTMLCollection[];
    };
    getNext: Function;
    getPrevious: Function;
    getItem: Function;
  };
}

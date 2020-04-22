import { ISong } from "./songs.model";

export interface IPlaylist {
  description: string;
  name: string;
  userId: string;
  songs?: ISong[];
}

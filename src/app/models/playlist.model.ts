import { ISong } from './songs.model';

export interface IPlaylist {
  key: string;
  description: string;
  name: string;
  userId: string;
  songs?: ISong[];
  dateCreated?: string;
  dateUpdated?: string;
}

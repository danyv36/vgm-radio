export interface ISong {
  key: string | number;
  title: string;
  game: string;
  composer?: string;
  songFilename: string;
  ostImageFilename: string;
  isRelaxing: boolean;
  dateCreated: string;
}

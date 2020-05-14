export interface ISong {
  key: string;
  title: string;
  game: string;
  composer?: string;
  songFilename: string;
  ostImageFilename: string;
  isRelaxing: boolean;
  dateCreated?: string;
  dateUpdated?: string;
}

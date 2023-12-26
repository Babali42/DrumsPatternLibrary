export type BooleanArray = [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean];

export class Beat {
  public FileName: string;
  public Beats: BooleanArray;
  public IsMuted: boolean = false;
  DisplayName: any;

  constructor(fileName: string, beats: BooleanArray, displayName: string) {
    this.FileName = fileName;
    this.Beats = beats;
    this.DisplayName = displayName;
  }
}

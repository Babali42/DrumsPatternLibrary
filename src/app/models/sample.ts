export class Sample {
  public fileName: string;
  public sample: AudioBuffer | undefined;

  constructor(fileName: string) {
    this.fileName = fileName;
  }
}

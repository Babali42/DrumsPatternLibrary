export class Sample {
  public FileName: string;
  public Sample: AudioBuffer | undefined;

  constructor(fileName: string) {
    this.FileName = fileName;
  }
}

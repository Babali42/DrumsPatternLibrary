export class Track {
  constructor(name: string, fileName: string, steps: boolean[]) {
    this.name = name;
    this.fileName = fileName;
    this.steps = steps;
  }

  name: string = "";
  fileName: string = "";
  steps: boolean[] = [];
}

import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-bpm-input',
  standalone: true,
  imports: [],
  templateUrl: './bpm-input.component.html',
  styleUrl: './bpm-input.component.scss'
})
export class BpmInputComponent {
  maxBpm = 300;
  minBpm = 20;
  @Input() bpm : number = 128;

  incrementBpm() {
    this.bpm = Math.min(this.bpm+1, this.maxBpm);
  }

  decrementBpm() {
    this.bpm = Math.max(this.bpm-1, this.minBpm);
  }

  updateNumber(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let newValue = Number(inputElement.value);
    newValue = Math.min(newValue, this.maxBpm);
    newValue = Math.max(newValue, this.minBpm);
    this.bpm = newValue;
  }
}

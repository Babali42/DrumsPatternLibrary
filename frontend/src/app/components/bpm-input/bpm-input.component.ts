import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-bpm-input',
  standalone: true,
  imports: [],
  templateUrl: './bpm-input.component.html',
  styleUrl: './bpm-input.component.scss'
})
export class BpmInputComponent {
  @Input() bpm : number = 128;
}
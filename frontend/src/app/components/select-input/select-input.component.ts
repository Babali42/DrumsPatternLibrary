import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [FormsModule, NgForOf],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss'
})
export class SelectInputComponent {
  @Input() elements: string[] = [];
  @Input() selectedElement: string ="";
}

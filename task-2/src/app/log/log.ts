import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-log',
  standalone: true,
  templateUrl: './log.html',
  styleUrl: './log.css'
})
export class LogComponent {
  @Input() messages: string[] = [];
}

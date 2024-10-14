import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-image-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-text.component.html',
  styleUrl: './image-text.component.css',
})
export class ImageTextComponent {
  @Input() Direction: string = 'left';
  @Input() h1Content: string = '';
  @Input() h2Content: string = '';
  @Input() pContent: string = '';
  @Input() buttonContent: string = '';
  @Input() imgSrc: string = '';
}

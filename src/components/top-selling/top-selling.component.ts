import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-top-selling',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-selling.component.html',
  styleUrl: './top-selling.component.css',
})
export class TopSellingComponent implements OnChanges {
  @Input() data!: any[];
  loadedTopSelling: number = 5;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.data = this.data.sort((a, b) => b.amount - a.amount);
    }
  }

  showMoreButtonClicked() {
    this.loadedTopSelling = this.loadedTopSelling + 5;
    console.log(this.loadedTopSelling);
  }
}

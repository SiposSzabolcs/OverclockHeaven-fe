import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css',
})
export class StarRatingComponent implements OnInit {
  @Input() rating!: number;
  percentRating: number = 0;

  ngOnInit(): void {
    this.percentRating = this.getPercentRating(this.rating);
    console.log(this.percentRating);
  }

  getPercentRating(rating: number): number {
    return 100 - (rating / 5) * 100;
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-user-review-stars',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  templateUrl: './user-review-stars.component.html',
  styleUrl: './user-review-stars.component.css',
})
export class UserReviewStarsComponent implements OnInit {
  @Input() ratings: number[] = [];
  rating: number = 0;
  ratings_dict: { [key: number]: number } = {};
  ratingsPercentages: { [key: number]: number } = {};

  ngOnInit(): void {
    this.countRatings();
    this.transformRatingsToPercentages();
    this.rating = this.getRating(this.ratings);
  }

  countRatings(): void {
    this.ratings_dict = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    for (let rating of this.ratings) {
      if (this.ratings_dict.hasOwnProperty(rating)) {
        this.ratings_dict[rating]++;
      }
    }

    console.log(this.ratings_dict);
  }

  transformRatingsToPercentages(): void {
    const totalRatings = this.ratings.length;
    if (totalRatings === 0) {
      return;
    }

    this.ratingsPercentages = {};

    for (let rating in this.ratings_dict) {
      const count = this.ratings_dict[rating];
      this.ratingsPercentages[+rating] = (count / totalRatings) * 100;
    }
  }

  getRating(ratings: number[]) {
    const sum = ratings.reduce((a: number, b: number) => a + b, 0);
    return sum / ratings.length;
  }
}

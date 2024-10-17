import { Component, Input, OnInit } from '@angular/core';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [StarRatingComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  @Input() product: any;
  rating: number = 0;

  ngOnInit(): void {
    if (this.product.ratings.length != 0) {
      this.rating = this.getRating(this.product.ratings);
    }
  }

  getRating(ratings: number[]) {
    const sum = ratings.reduce((a: number, b: number) => a + b, 0);
    return sum / ratings.length;
  }
}

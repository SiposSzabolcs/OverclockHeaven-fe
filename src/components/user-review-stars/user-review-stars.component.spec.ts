import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReviewStarsComponent } from './user-review-stars.component';

describe('UserReviewStarsComponent', () => {
  let component: UserReviewStarsComponent;
  let fixture: ComponentFixture<UserReviewStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserReviewStarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReviewStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeProductPageComponent } from './change-product-page.component';

describe('ChangeProductPageComponent', () => {
  let component: ChangeProductPageComponent;
  let fixture: ComponentFixture<ChangeProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeProductPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

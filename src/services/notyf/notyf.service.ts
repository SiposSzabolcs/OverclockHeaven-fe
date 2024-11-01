import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root',
})
export class NotyfService {
  private notyf: Notyf;

  constructor() {
    this.notyf = new Notyf({
      duration: 3000,
      ripple: true,
      position: { x: 'right', y: 'top' },
    });
  }

  success(message: string) {
    this.notyf.success(message);
  }

  error(message: string) {
    this.notyf.error(message);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnerVisibilitySource = new BehaviorSubject<boolean>(false);
  spinnerVisibility$ = this.spinnerVisibilitySource.asObservable();

  constructor() { }
  
  showSpinner(): void {
    this.spinnerVisibilitySource.next(true);
  }

  hideSpinner(): void {
    this.spinnerVisibilitySource.next(false);
  }
}

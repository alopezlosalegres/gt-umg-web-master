import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading: boolean = true;
  subjectLoading: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  setLoading(loading: boolean): void {
    this.loading = loading;
    this.subjectLoading.next(loading);
  }

  getLoading(): Observable<boolean> {
    return this.subjectLoading.asObservable();
  }
}

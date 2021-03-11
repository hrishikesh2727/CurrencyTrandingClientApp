import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  loadingStageChanged = new Subject<boolean>();
  constructor() { }

  showProgressBar(){
    this.loadingStageChanged.next(true);
  }

  hideProgressBar(){
    this.loadingStageChanged.next(false);
  }
}
